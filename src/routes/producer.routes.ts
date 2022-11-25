import { Router } from 'express';
import { producerController } from '../factory';

const producerRoutes = Router();

producerRoutes.post('/producers', producerController.create);

export default producerRoutes;