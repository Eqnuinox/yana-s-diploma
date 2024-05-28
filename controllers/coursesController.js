import courseService from '../services/courseService.js';
import testService from '../services/testService.js';

class CoursesController {
    async createCourse(req, res, next) {
        try {
            const course = await courseService.createCourse(req.body);
            res.status(200).json(course);
        } catch (error) {
            next(error);
        }
    }
    async getAllCourses(req, res, next) {
        try {
            const courses = await courseService.getAllCourses();
            res.status(200).json(courses);
        } catch (error) {
            next(error);
        }
    }

    async getAllCoursesTest(req, res, next) {
        try {
            const tests = await testService.getAllCourseTests(req.params.id);
            res.status(200).json(tests);
        } catch (error) {
            next(error);
        }
    }

    async getOneCourse(req, res, next) {
        try {
            const course = await courseService.getOneCourse(req.params.id);
            res.status(200).json(course);
        } catch (error) {
            next(error);
        }
    }
    async updateCourse(req, res, next) {
        try {
            const course = await courseService.updateCourse(
                req.body,
                req.params.id
            );
            res.status(200).json(course);
        } catch (error) {
            next(error);
        }
    }
    async deleteCourse(req, res, next) {
        try {
            const course = await courseService.deleteCourse(req.params.id);
            res.status(200).json(course);
        } catch (error) {
            next(error);
        }
    }
}

export default new CoursesController();
