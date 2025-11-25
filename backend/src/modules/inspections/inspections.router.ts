import { Router } from 'express';
import { inspectionController } from './inspections.controller.js';
import { upload } from '../../middleware/upload.js';

const router = Router();

// POST /api/inspections - Create new inspection
router.post('/', inspectionController.create.bind(inspectionController));

// POST /api/inspections/:id/images - Add images to inspection
router.post('/:id/images', upload.array('images', 10), inspectionController.addImages.bind(inspectionController));

// POST /api/inspections/:id/analyze - Analyze inspection with AI
router.post('/:id/analyze', inspectionController.analyze.bind(inspectionController));

// POST /api/inspections/:id/mint - Mint inspection result to Hydra L2
router.post('/:id/mint', inspectionController.mint.bind(inspectionController));

// GET /api/inspections/:id - Get single inspection
router.get('/:id', inspectionController.getOne.bind(inspectionController));

// GET /api/inspections - List all inspections
router.get('/', inspectionController.list.bind(inspectionController));

export default router;
