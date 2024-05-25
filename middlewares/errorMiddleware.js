import HttpErrors from '../exceptions/httpErrors.js';
import logger from '../logger.js';

export default function errorMiddleware(err, req, res, next) {
    logger.error(err);
    if (err instanceof HttpErrors) {
        return res
            .status(err.status)
            .json({ message: err.message, errors: err.errors });
    }
    return res.status(500).json({ message: 'Unexpected error' });
}
