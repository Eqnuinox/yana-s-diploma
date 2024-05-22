class HttpErrors extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static BadRequest(message, errors = []) {
        return new HttpErrors(400, message, errors);
    }

    static UnauthorizedError() {
        return new HttpErrors(401, 'Unauthorized user');
    }
}
