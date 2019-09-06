import { Router } from 'express';
import UserController from '../src/app/controllers/UserController';

const routes = Router();

routes.post('/users', UserController.update);

export default routes;
