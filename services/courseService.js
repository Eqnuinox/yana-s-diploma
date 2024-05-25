import { Course } from '../models/models';
import HttpErrors from '../exceptions/httpErrors.js';

class CourseService {
    async createCourse(data) {
        const existCourse = Course.findOne({ where: { title: data.title } });
        if (existCourse) {
            throw HttpErrors.BadRequest('course already exist');
        }

        const course = Course.create(data);
        return res.json(course);
    }

    async getAllCourses() {
        const courses = Course.findAll();
        return res.json(courses);
    }

    async getOneCourse(title) {
        const course = Course.findOne({ where: { title } });
        return res.json(course);
    }

    async updateCourse(id) {
        const course = Course.update({ where: { id } });
        return res.json(course);
    }

    async deleteCourse(id) {
        const course = Course.destroy({ where: { id } });
        return res.json(course);
    }
}

export default new CourseService();
