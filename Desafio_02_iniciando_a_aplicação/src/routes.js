import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController.js';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.createUser);
routes.post('/sessions', SessionController.useSession);
routes.use(authMiddleware);
routes.put('/users', UserController.update);

export default routes;
