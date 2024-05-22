import userService from '../services/userService.js';

class UserController {
    async createUser(req, res) {
        try {
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default new UserController();
