import { User } from '../models/models.js';
import bcrypt from 'bcrypt';
import tokenService from './tokenService.js';
import UserDto from '../dtos/userDto.js';
import HttpErrors from '../exceptions/httpErrors.js';
import logger from '../logger.js';
import { where } from 'sequelize';

class AuthService {
    async registration(data) {
        const { email, password } = data;
        const existUser = await User.findOne({
            where: { email },
            raw: true
        });

        if (existUser) {
            throw HttpErrors.BadRequest(`User ${email} already exist`);
        }

        const hashedPassword = await bcrypt.hash(password, 3);
        const user = await User.create({ ...data, password: hashedPassword });

        const userDto = new UserDto(user);
        const token = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, token.refreshToken);

        return { ...token, user: userDto };
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw HttpErrors.BadRequest(`User with ${email} email not found`);
        }
        logger.info(password);
        logger.info(user.password);

        const isPasswordEquals = await bcrypt.compare(password, user.password);
        if (!isPasswordEquals) {
            throw HttpErrors.BadRequest('Incorrect password');
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }

    async logOut(refreshToken) {
        await tokenService.removeToken(refreshToken);
        return;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw HttpErrors.UnauthorizedError();
        }
        console.log(refreshToken);
        const userData = tokenService.validateRefreshToken(refreshToken);
        const existToken = await tokenService.findToken(refreshToken);
        if (!existToken || !userData) {
            throw HttpErrors.UnauthorizedError();
        }

        const user = await User.findByPk(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }
}

export default new AuthService();
