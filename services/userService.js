import HttpErrors from '../exceptions/httpErrors.js';
import { User } from '../models/models.js';

class UserService {
    async getAllUsers() {
        const users = User.findAll();
        return users;
    }
    async getOneUsers(id) {
        const user = await User.findByPk(id);
        return user;
    }

    async updateUser(id, data) {
        const existUser = await User.findByPk(id);
        if (!existUser) {
            throw HttpErrors.BadRequest('User does not exist');
        }
        const updatedUser = existUser.update(data);

        return updatedUser;
    }

    async deleteUser(id) {
        const user = await User.destroy({ where: { id } });
        return user;
    }
}

export default new UserService();
