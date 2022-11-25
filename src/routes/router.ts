import { Router } from 'express';
import producerRoutes from './producer.routes';

const router = Router();

router.use('/producers', producerRoutes);

export default router;