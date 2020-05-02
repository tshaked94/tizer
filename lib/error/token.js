class TokenExpiredError extends Error {
    constructor(message) {
        super(message);
        this.name = 'TokenExpiredError';
    }
}





class InvalidTokenError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidTokenError';
    }
}

module.exports = {
    TokenExpiredError: TokenExpiredError,
    InvalidTokenError: InvalidTokenError
};

// module.exports.TokenExpiredError = TokenExpiredError;
// module.exports.InvalidTokenError = InvalidTokenError;