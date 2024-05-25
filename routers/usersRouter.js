import Router from 'express';
import userController from '../controllers/userController.js';

const userRouter = new Router();

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getOneUser);
userRouter.post('/');
userRouter.patch('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

export default userRouter;
