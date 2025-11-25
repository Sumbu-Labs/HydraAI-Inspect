import { env } from '../../config/env';

export interface YoloDetection {
    class: string;
    confidence: number;
    bbox: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}

export interface DamageResult {
    class: string;
    severity: string;
    confidence: number;
    location?: string;
    bbox?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}

export interface AnalysisResult {
    inspectionId: string;
    plate: string;
    vin: string;
    totalDamages: number;
    avgConfidence: number;
    score: number;
    damages: DamageResult[];
    vctMetadata: {
        vehicleInfo: {
            plate: string;
            vin: string;
            label?: string;
        };
        inspectionDate: string;
        damageCount: number;
        overallScore: number;
    };
}

class AIService {
    private baseURL: string;

    constructor() {
        this.baseURL = env.AI_SERVICE_URL;
    }

    /**
     * Analyze images using FormData
     * @param inspectionId - Inspection ID
     * @param plate - Vehicle plate number
     * @param vin - Vehicle VIN
     * @param images - Array of image files or URLs
     */
    async analyzeWithFormData(
        inspectionId: string,
        plate: string,
        vin: string,
        images: File[] | string[]
    ): Promise<AnalysisResult> {
        try {
            const formData = new FormData();
            formData.append('inspectionId', inspectionId);
            formData.append('plate', plate);
            formData.append('vin', vin);

            // Add images to FormData
            images.forEach((image, index) => {
                if (typeof image === 'string') {
                    // If image is URL, send as string
                    formData.append('imageUrls', image);
                } else {
                    // If image is File, append directly
                    formData.append('images', image, `image_${index}.jpg`);
                }
            });

            const response = await fetch(`${this.baseURL}/analyze`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`AI Service returned ${response.status}: ${response.statusText}`);
            }

            return await response.json() as AnalysisResult;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`AI Service error: ${error.message}`);
            }
            throw error;
        }
    }

    /**
     * Health check for AI service
     */
    async healthCheck(): Promise<{ status: string; modelLoaded: boolean }> {
        try {
            const response = await fetch(`${this.baseURL}/health`, {
                method: 'GET',
                signal: AbortSignal.timeout(5000),
            });

            if (!response.ok) {
                return { status: 'error', modelLoaded: false };
            }

            return await response.json() as { status: string; modelLoaded: boolean };
        } catch (error) {
            return { status: 'error', modelLoaded: false };
        }
    }
}

export const aiService = new AIService();
