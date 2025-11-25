import { prisma } from '../../db/index.js';
import { aiService } from '../ai/ai.service.js';
import { AppError } from '../../middleware/errorHandler.js';
import { env } from '../../config/env.js';
import {
    CreateInspectionDTO,
    AddImageDTO,
    InspectionWithRelations,
    DamageClass,
    DamageSeverity
} from './inspections.model.js';
import { InspectionStatus } from '@prisma/client';

class InspectionService {
    async createInspection(data: CreateInspectionDTO) {
        const inspection = await prisma.inspection.create({
            data: {
                vehicleLabel: data.vehicleLabel,
                plate: data.plate,
                vin: data.vin,
                status: InspectionStatus.PENDING_UPLOAD,
            },
            include: {
                images: true,
                damages: true,
            },
        });

        return inspection;
    }

    async addImages(inspectionId: string, images: AddImageDTO[]) {
        const inspection = await prisma.inspection.findUnique({
            where: { id: inspectionId },
        });

        if (!inspection) {
            throw new AppError(404, 'Inspection not found');
        }

        await prisma.inspectionImage.createMany({
            data: images.map((img) => ({
                inspectionId,
                url: img.url,
                orderIndex: img.orderIndex,
            })),
        });

        const updated = await prisma.inspection.findUnique({
            where: { id: inspectionId },
            include: {
                images: true,
                damages: true,
            },
        });

        return updated;
    }

    async analyzeInspection(inspectionId: string) {
        const inspection = await prisma.inspection.findUnique({
            where: { id: inspectionId },
            include: { images: true },
        });

        if (!inspection) {
            throw new AppError(404, 'Inspection not found');
        }

        if (inspection.images.length === 0) {
            throw new AppError(400, 'No images to analyze');
        }

        // Update status to PENDING_AI
        await prisma.inspection.update({
            where: { id: inspectionId },
            data: { status: InspectionStatus.PENDING_AI },
        });

        try {
            // Call AI service
            const imageUrls = inspection.images.map((img) => {
                // Convert local path to full URL if needed
                if (img.url.startsWith('/uploads/')) {
                    return `${env.BASE_URL}${img.url}`;
                }
                return img.url;
            });

            // We pass empty strings for plate/vin as they are already in DB
            // In a real scenario, we might want to pass them if AI service needs them for VCT
            const analysisResult = await aiService.analyzeWithFormData(
                inspectionId,
                inspection.plate,
                inspection.vin,
                imageUrls
            );

            // Map AI detections to damages
            const damages = analysisResult.damages.map((damage) => ({
                inspectionId,
                clazz: damage.class as DamageClass,
                severity: damage.severity as DamageSeverity,
                confidence: damage.confidence,
                bbox: damage.bbox,
            }));

            // Save damages and update inspection
            await prisma.inspectionDamage.createMany({
                data: damages,
            });

            // Create VCT Token record (metadata only, minting happens later or via another service)
            if (analysisResult.vctMetadata) {
                await prisma.vctToken.create({
                    data: {
                        inspectionId,
                        policyId: "pending", // Placeholder
                        assetName: `VCT-${inspection.plate}`,
                        txHash: "pending",
                        network: "Hydra",
                        metadata: analysisResult.vctMetadata,
                    }
                });
            }

            const updated = await prisma.inspection.update({
                where: { id: inspectionId },
                data: {
                    status: InspectionStatus.ANALYZED,
                    totalDamages: analysisResult.totalDamages,
                    avgConfidence: analysisResult.avgConfidence,
                    score: analysisResult.score,
                },
                include: {
                    images: true,
                    damages: true,
                    vctToken: true,
                },
            });

            return updated;
        } catch (error) {
            // Revert status on error
            await prisma.inspection.update({
                where: { id: inspectionId },
                data: { status: InspectionStatus.PENDING_UPLOAD },
            });
            throw error;
        }
    }

    async getInspection(inspectionId: string): Promise<InspectionWithRelations | null> {
        const inspection = await prisma.inspection.findUnique({
            where: { id: inspectionId },
            include: {
                images: {
                    orderBy: { orderIndex: 'asc' },
                },
                damages: true,
            },
        });

        return inspection;
    }

    async listInspections(limit = 50, offset = 0) {
        const [inspections, total] = await Promise.all([
            prisma.inspection.findMany({
                take: limit,
                skip: offset,
                orderBy: { createdAt: 'desc' },
                include: {
                    images: {
                        orderBy: { orderIndex: 'asc' },
                    },
                    damages: true,
                },
            }),
            prisma.inspection.count(),
        ]);

        return {
            inspections,
            total,
            limit,
            offset,
        };
    }

    async mintInspection(inspectionId: string) {
        const inspection = await prisma.inspection.findUnique({
            where: { id: inspectionId },
            include: { vctToken: true },
        });

        if (!inspection) {
            throw new AppError(404, 'Inspection not found');
        }

        if (inspection.status === InspectionStatus.MINTED) {
            throw new AppError(400, 'Inspection already minted');
        }

        if (inspection.status !== InspectionStatus.ANALYZED) {
            throw new AppError(400, 'Inspection must be analyzed before minting');
        }

        // Mock Hydra L2 Minting Process
        // In a real app, this would interact with a Cardano/Hydra node
        const txHash = '829a' + Math.random().toString(16).substr(2, 60); // Fake hash
        const policyId = 'policy_' + Math.random().toString(36).substr(2, 10);

        // Update VCT Token with real on-chain data
        if (inspection.vctToken) {
            await prisma.vctToken.update({
                where: { id: inspection.vctToken.id },
                data: {
                    txHash,
                    policyId,
                    mintedAt: new Date(),
                },
            });
        } else {
            // Should have been created during analysis, but handle fallback
            await prisma.vctToken.create({
                data: {
                    inspectionId,
                    policyId,
                    assetName: `VCT-${inspection.plate}`,
                    txHash,
                    network: "Hydra",
                    metadata: {},
                    mintedAt: new Date(),
                }
            });
        }

        // Update Inspection Status
        const updated = await prisma.inspection.update({
            where: { id: inspectionId },
            data: { status: InspectionStatus.MINTED },
            include: {
                images: true,
                damages: true,
                vctToken: true,
            },
        });

        return updated;
    }

    private calculateSeverity(confidence: number): DamageSeverity {
        if (confidence >= 0.8) return DamageSeverity.HIGH;
        if (confidence >= 0.5) return DamageSeverity.MEDIUM;
        return DamageSeverity.LOW;
    }
}

export const inspectionService = new InspectionService();
