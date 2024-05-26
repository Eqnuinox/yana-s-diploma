import api from '../http';

export default class TestService {
    static async create(data) {
        return api.post('/tests', data);
    }

    static async getAllTests() {
        return api.get('/tests');
    }
    static async getOneTest(id) {
        return api.get(`/tests/${id}`);
    }

    static async updateTest(id, data) {
        return api.patch(`/tests/${id}`, data);
    }
    static async deleteTest(id) {
        return api.delete(`/tests/${id}`);
    }

    static async checkTestResults(id, data) {
        return api.post(`/tests/${id}`, data);
    }
}
