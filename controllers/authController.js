import { validationResult } from 'express-validator';
import authService from '../services/authService.js';
import HttpErrors from '../exceptions/httpErrors.js';

class AuthController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(
                    HttpErrors.BadRequest('Validation error', errors.array())
                );
            }

            const user = await authService.registration(req.body);
            res.cookie('refreshToken', user.refreshToken, {
                httpOnly: true
            });
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await authService.login(email, password);
            res.cookie('refreshToken', user.refreshToken, {
                httpOnly: true
            });
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            await authService.logOut(refreshToken);
            res.clearCookie('refreshToken');
            res.status(200).json('LogOut');
        } catch (error) {
            next(error);
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const user = await authService.refresh(refreshToken);

            res.cookie('refreshToken', user.refreshToken, {
                httpOnly: true
            });
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();
