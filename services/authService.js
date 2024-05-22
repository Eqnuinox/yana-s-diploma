import { User } from '../models/models.js';
import bcrypt from 'bcrypt';
import tokenService from './tokenService.js';
import UserDto from '../dtos/userDto.js';

class AuthService {
    async registration(data) {
        const { email, password } = data;
        const existUser = await User.findOne({
            where: { email },
            raw: true
        });

        if (existUser) {
            return `User ${email} already exist`;
        }

        const hashedPassword = await bcrypt.hash(password, 3);
        const user = await User.create({ ...data, password: hashedPassword });

        const userDto = new UserDto(user);
        const token = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, token.refreshToken);

        return { ...token, user: userDto };
    }
}

export default new AuthService();
