import jwt from 'jsonwebtoken';
import { Token } from '../models/models.js';

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
    async saveToken(user_id, refreshToken) {
        const tokenData = await Token.findOne({ where: user_id });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await Token.create({ user_id, refreshToken });
        return token;
    }
}

export default new TokenService();
