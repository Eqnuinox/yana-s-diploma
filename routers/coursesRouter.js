import Router from 'express';
import coursesController from '../controllers/coursesController.js';

const coursesRouter = new Router();

coursesRouter.get('/', coursesController.getAllCourses);
coursesRouter.get('/:id', coursesController.getOneCourse);
coursesRouter.get('/tests/:id', coursesController.getAllCoursesTest);
coursesRouter.post('/', coursesController.createCourse);
coursesRouter.patch('/:id', coursesController.updateCourse);
coursesRouter.delete('/:id', coursesController.deleteCourse);

export default coursesRouter;
