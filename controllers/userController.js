import userService from '../services/userService.js';

class UserController {
    async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (error) {
            next(error);
        }
    }

    async getOneUser(req, res, next) {
        try {
            const { id } = req.query;
            const user = await userService.getOneUsers(id);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async updateUser(req, res, next) {
        try {
            const { id } = req.query;
            const user = await userService.updateUser(id, req.body);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const { id } = req.query;
            const user = await userService.deleteUser(id);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();
