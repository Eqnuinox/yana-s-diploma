import { Course } from '../models/models';
import HttpErrors from '../exceptions/httpErrors.js';

class TestService {
    async createTest(data) {
        const existCourse = Course.findOne({ where: { title: data.title } });
        if (existCourse) {
            throw HttpErrors.BadRequest('course already exist');
        }

        const course = Course.create(data);
        return course;
    }

    async getAllTests() {
        const courses = Course.findAll();
        return courses;
    }

    async getOneTest(title) {
        const courses = Course.findOne({ where: { title } });
        return courses;
    }

    async updateTest(id) {
        const course = Course.update({ where: { id } });
        return course;
    }

    async deleteTest(id) {
        const course = Course.destroy({ where: { id } });
        return course;
    }
}

export default new TestService();
