import { Router } from 'express';
import producerRoutes from './producer.routes';
import eventRoutes from './event.routes';

const router = Router();

router.use('/producers', producerRoutes);
router.use('/events', eventRoutes);

export default router;