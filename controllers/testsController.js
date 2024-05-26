import testService from '../services/testService.js';

class TestsController {
    async createTest(req, res, next) {
        try {
            const test = await testService.createTest(req.body);
            return res.json(test);
        } catch (error) {
            next(error);
        }
    }
    async getAllTests(req, res, next) {
        try {
            const tests = await testService.getAllTests();
            res.json(tests);
        } catch (error) {
            next(error);
        }
    }
    async getOneTest(req, res, next) {
        try {
            const { id } = req.params;
            const test = await testService.getOneTest(id);
            res.json(test);
        } catch (error) {
            next(error);
        }
    }
    async updateTest(req, res, next) {
        try {
            const { id } = req.params;
            const test = await testService.updateTest(id, req.body);
            res.json(test);
        } catch (error) {
            next(error);
        }
    }
    async deleteTest(req, res, next) {
        try {
            const { id } = req.params;
            const test = await testService.deleteTest(id);
            res.json(test);
        } catch (error) {
            next(error);
        }
    }

    async checkTestResults(req, res, next) {
        try {
            const { id } = req.params;
            const test = await testService.checkTestResults(id, req.body);
            res.json(test);
        } catch (error) {
            next(error);
        }
    }
}

export default new TestsController();
