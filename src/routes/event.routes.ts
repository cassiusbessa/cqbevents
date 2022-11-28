import { Router } from 'express';
import { eventController } from '../factory';
import { authMid } from '../middleware';

const router = Router();

router.post('/', authMid.validateToken, eventController.create);
router.get('/', eventController.read);
router.get('/tickets', eventController.getTickets);
router.get('/attractions', eventController.getAttractions);

export default router;