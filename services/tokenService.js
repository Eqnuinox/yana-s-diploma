import jwt from 'jsonwebtoken';
import { Token } from '../models/models.js';
import { where } from 'sequelize';
import logger from '../logger.js';

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET_ACCESS, {
            expiresIn: '1h'
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_REFRESH, {
            expiresIn: '30d'
        });
        return { accessToken, refreshToken };
    }

    validateAccessToken(token) {
        try {
            const user = jwt.verify(token, process.env.JWT_SECRET_ACCESS);
            return user;
        } catch (error) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const user = jwt.verify(token, process.env.JWT_SECRET_ACCESS);
            return user;
        } catch (error) {
            return null;
        }
    }

    async saveToken(user_id, refreshToken) {
        const tokenData = await Token.findOne({ where: { user_id } });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await Token.create({ user_id, refreshToken });
        return token;
    }

    async removeToken(refreshToken) {
        await Token.destroy({
            where: { refreshToken: refreshToken }
        });
        return;
    }

    async findToken(refreshToken) {
        const token = await Token.findOne({ where: { refreshToken } });
        return token;
    }
}

export default new TokenService();
