import { Result, Retries, Test } from '../models/models.js';
import HttpErrors from '../exceptions/httpErrors.js';

class TestService {
    async createTest(data) {
        const existTest = await Test.findOne({ where: { title: data.title } });
        console.log(existTest);
        if (existTest) {
            throw HttpErrors.BadRequest('test already exist');
        }
        console.log(data);
        const test = await Test.create(data);
        return test;
    }

    async getAllTests() {
        const tests = await Test.findAll();
        return tests;
    }

    async getOneTest(id) {
        const test = await Test.findByPk(id);
        return test;
    }

    async updateTest(id, data) {
        const test = await Test.update(data, { where: { id } });
        return test;
    }

    async deleteTest(id) {
        const test = await Test.destroy({ where: { id } });
        return test;
    }

    async checkTestResults(id, data) {
        const { body, passCondition, title } = await Test.findByPk(id);
        const { candidateAnswers } = data;

        const candidateAnswersEntries = Object.entries(candidateAnswers);
        const correctAnswersEntries = Object.entries(body.correctAnswers);

        console.log(candidateAnswersEntries);
        console.log(correctAnswersEntries);

        if (candidateAnswersEntries.length !== correctAnswersEntries.length) {
            throw HttpErrors.BadRequest('Answers more than questions, wtf?');
        }

        const mistakes = [];
        for (let i = 0; i < candidateAnswersEntries.length; i++) {
            if (candidateAnswersEntries[i][1] !== correctAnswersEntries[i][1]) {
                mistakes.push([
                    candidateAnswersEntries[i][0],
                    candidateAnswersEntries[i][1]
                ]);
            }
        }

        const testResult = { mistakes: { ...Object.fromEntries(mistakes) } };
        const admission = body.questionsCount - passCondition;

        if (mistakes.length <= admission) {
            testResult.passed = true;
        } else {
            testResult.passed = false;
        }

        const testRetries = await Retries.findOne({
            where: { test_id: id }
        });

        if (!testRetries) {
            await Retries.create({
                test_id: id,
                count: 1
            });
        } else {
            testRetries.count++;
            testRetries.save();
        }

        const existResult = await Result.findOne({ where: { title } });
        if (!existResult) {
            const results = await Result.create(
                {
                    title,
                    isPassed: testResult.passed,
                    result: testResult,
                    test_id: id
                },
                { include: { model: Test, as: 'test_results' } }
            );
            return results;
        }
        existResult.update({
            isPassed: testResult.passed,
            result: testResult
        });

        existResult.save();

        //TODO include model do not displays

        return existResult;
    }
}

export default new TestService();
