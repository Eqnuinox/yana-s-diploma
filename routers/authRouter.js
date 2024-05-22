import Router from 'express';
import authController from '../controllers/authController.js';

const authRouter = new Router();

authRouter.post('/registration', authController.registration);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.get('/refresh', authController.refresh);

export default authRouter;
