import Router from 'express';
import userRouter from './usersRouter.js';
import authRouter from './authRouter.js';

const router = new Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);

export default router;
