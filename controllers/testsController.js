import testService from '../services/testService';

class TestsController {
    async createTest(error, req, res, next) {
        try {
            const test = await testService.createTest(req.body);
            return res.json(test);
        } catch (error) {
            next(error);
        }
    }
    async getAllTests(error, req, res, next) {
        try {
            const tests = await testService.getAllTests();
            return res.json(tests);
        } catch (error) {
            next(error);
        }
    }
    async getOneTest(error, req, res, next) {
        try {
            const { id } = req.query.id;
            const test = await testService.getOneTest(id);
            return res.json(test);
        } catch (error) {
            next(error);
        }
    }
    async updateTest(error, req, res, next) {
        try {
            const { id } = req.query.id;
            const test = await testService.createTest(id);
            return res.json(test);
        } catch (error) {
            next(error);
        }
    }
    async deleteTest(error, req, res, next) {
        try {
            const { id } = req.query.id;
            const test = await testService.createTest(id);
            return res.json(test);
        } catch (error) {
            next(error);
        }
    }
}

export default new TestsController();
