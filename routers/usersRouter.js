import Router from 'express';
import userController from '../controllers/userController.js';

const userRouter = new Router();

userRouter.get('/');
userRouter.get('/:user_id');
userRouter.post('/', userController.createUser);
userRouter.patch('/');
userRouter.delete('/');

export default userRouter;
