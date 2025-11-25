import { Request, Response, NextFunction } from 'express';
import { inspectionService } from './inspections.service';
import { AppError } from '../../middleware/errorHandler';

class InspectionController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { vehicleLabel, plate, vin } = req.body;

            if (!plate || !vin) {
                throw new AppError(400, 'plate and vin are required');
            }

            const inspection = await inspectionService.createInspection({
                vehicleLabel,
                plate,
                vin,
            });

            res.status(201).json({
                status: 'success',
                data: inspection,
            });
        } catch (error) {
            next(error);
        }
    }

    async addImages(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const files = req.files as Express.Multer.File[];

            if (!files || files.length === 0) {
                throw new AppError(400, 'At least one image file is required');
            }

            // Convert files to image URLs
            // TODO: In production, upload to cloud storage (S3, Cloudinary, etc.)
            // For now, we'll use local file paths
            const images = files.map((file, index) => ({
                url: `/uploads/${file.filename}`,
                orderIndex: index,
            }));

            const inspection = await inspectionService.addImages(id, images);

            res.status(200).json({
                status: 'success',
                data: inspection,
            });
        } catch (error) {
            next(error);
        }
    }

    async analyze(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const inspection = await inspectionService.analyzeInspection(id);

            res.status(200).json({
                status: 'success',
                data: inspection,
            });
        } catch (error) {
            next(error);
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const inspection = await inspectionService.getInspection(id);

            if (!inspection) {
                throw new AppError(404, 'Inspection not found');
            }

            res.status(200).json({
                status: 'success',
                data: inspection,
            });
        } catch (error) {
            next(error);
        }
    }

    async list(req: Request, res: Response, next: NextFunction) {
        try {
            const limit = parseInt(req.query.limit as string) || 50;
            const offset = parseInt(req.query.offset as string) || 0;

            const result = await inspectionService.listInspections(limit, offset);

            res.status(200).json({
                status: 'success',
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    async mint(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const inspection = await inspectionService.mintInspection(id);

            res.status(200).json({
                status: 'success',
                data: inspection,
            });
        } catch (error) {
            next(error);
        }
    }
}

export const inspectionController = new InspectionController();
