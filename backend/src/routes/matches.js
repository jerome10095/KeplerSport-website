import { Router } from 'express';
import * as ctrl from '../controllers/matchesController.js';

const router = Router();

router.get('/', ctrl.list);
router.get('/live', ctrl.live);

export default router;
