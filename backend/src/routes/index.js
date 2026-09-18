import { Router } from 'express';
import teams from './teams.js';
import matches from './matches.js';

const router = Router();

router.use('/teams', teams);
router.use('/matches', matches);

export default router;
