import { Router } from 'express';
import { eventController } from '../factory';
import { authMid } from '../middleware';

const router = Router();

router.post('/', authMid.validateToken, eventController.create);
router.get('/', eventController.read);
router.get('/genre', eventController.genreSearch);
router.get('/tickets', eventController.ticketsDateSearch);
router.get('/tickets/price', eventController.ticketsPriceSearch);
router.get('/producer', eventController.producerSearch);
router.get('/title', eventController.titleSearch);
router.get('/attractions', eventController.attractionsDateSearch);
router.get('/attractions/name', eventController.attractionsNameSearch);
router.get('/local', eventController.localSearch);

export default router;