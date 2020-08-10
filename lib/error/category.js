class CategoryError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CategoryError';
    }
}


module.exports = {
    CategoryError
};