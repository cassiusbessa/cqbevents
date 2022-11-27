import { Router } from 'express';
import { eventController } from '../factory';
import { authMid } from '../middleware';

const router = Router();

router.post('/', authMid.validateToken, eventController.create);

export default router;