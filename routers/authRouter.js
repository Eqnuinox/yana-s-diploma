import Router from 'express';
import authController from '../controllers/authController.js';
import { body } from 'express-validator';

const authRouter = new Router();

authRouter.post(
    '/registration',
    body('email').isEmail(),
    body('password').isStrongPassword({
        minLength: 8,
        minNumbers: 1
    }),
    authController.registration
);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.get('/refresh', authController.refresh);

export default authRouter;
