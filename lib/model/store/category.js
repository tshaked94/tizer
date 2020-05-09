//here all categorie

const CategoryError = require('../../error/category').CategoryError;

const categories = {
    pizza: 'pizza',
    burger: 'burger',
    beer: 'beer'
}

//freeze categories - 
//can't add more properties (enum implementation)

Object.freeze(categories);

const validateCategory = (category) => {

    for (property in categories) {

        if (!category.localeCompare(property))
            return;
    }

    throw new CategoryError('Undefined Category');
}

module.exports = {
    // categories: categories,
    validateCategory: validateCategory
};