import Router from 'express';
import userRouter from './usersRouter.js';
import authRouter from './authRouter.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import coursesRouter from './coursesRouter.js';
import testsRouter from './testsRouter.js';

const router = new Router();

router.use('/users', authMiddleware, userRouter);
router.use('/auth', authRouter);
router.use('/tests', testsRouter);

router.use('/courses', coursesRouter);

export default router;
