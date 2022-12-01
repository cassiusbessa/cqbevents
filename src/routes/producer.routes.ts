import { Router } from 'express';
import { producerController } from '../factory';
import { authMid } from '../middleware';

const producerRoutes = Router();

producerRoutes.post('/', producerController.create);
producerRoutes.post('/login', producerController.login);
producerRoutes.put('/', authMid.validateToken, producerController.update);
producerRoutes.delete('/', authMid.validateToken, producerController.delete);
producerRoutes.get('/', authMid.validateToken, producerController.readOne);

export default producerRoutes;