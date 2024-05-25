import HttpErrors from '../exceptions/httpErrors.js';
import tokenService from '../services/tokenService.js';

export default function authMiddleware(req, res, next) {
    try {
        const authorizationHeaders = req.headers.authorization;
        if (!authorizationHeaders) {
            return next(HttpErrors.UnauthorizedError());
        }

        const accessToken = authorizationHeaders.split(' ')[1];
        if (!accessToken) {
            return next(HttpErrors.UnauthorizedError());
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(HttpErrors.UnauthorizedError());
        }

        req.user = userData;
        next();
    } catch (error) {
        next(HttpErrors.UnauthorizedError());
    }
}
