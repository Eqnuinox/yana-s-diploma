import Router from 'express';
import testsController from '../controllers/testsController.js';

const testsRouter = new Router();

testsRouter.get('/', testsController.getAllTests);
testsRouter.get('/:id', testsController.getOneTest);
testsRouter.post('/', testsController.createTest);
testsRouter.patch('/:id', testsController.updateTest);
testsRouter.delete('/:id', testsController.deleteTest);
testsRouter.post('/:id', testsController.checkTestResults);

export default testsRouter;
