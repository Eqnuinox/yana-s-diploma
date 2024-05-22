import logger from '../logger.js';
import authService from '../services/authService.js';

class AuthController {
    async registration(req, res, next) {
        try {
            const user = await authService.registration(req.body);
            res.cookie('refreshToken', user.refreshToken, {
                maxAge: 30,
                httpOnly: true
            });
            res.json(user);
        } catch (error) {
            logger.error(error, 'Auth-controller | registration');
            res.status(500).json(error);
        }
    }
    async login(req, res, next) {
        try {
        } catch (error) {}
    }
    async logout(req, res, next) {
        try {
        } catch (error) {}
    }
    async refresh(req, res, next) {
        try {
        } catch (error) {}
    }
}

export default new AuthController();
