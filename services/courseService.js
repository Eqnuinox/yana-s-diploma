import { Course } from '../models/models.js';
import HttpErrors from '../exceptions/httpErrors.js';

class CourseService {
    async createCourse(data) {
        const existCourse = await Course.findOne({
            where: { title: data.title }
        });
        if (existCourse) {
            throw HttpErrors.BadRequest('course already exist');
        }

        const course = Course.create(data);
        return course;
    }

    async getAllCourses() {
        const courses = Course.findAll();
        return courses;
    }

    async getOneCourse(id) {
        const course = Course.findByPk(id);
        return course;
    }

    async updateCourse(data, id) {
        const course = Course.update(data, { where: { id } });
        return course;
    }

    async deleteCourse(id) {
        const course = Course.destroy({ where: { id } });
        return course;
    }
}

export default new CourseService();
