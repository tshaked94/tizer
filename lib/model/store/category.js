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

function validateCategory(categoriesToValidate) {
    if (categoriesToValidate === undefined)
        return;

    for (index in categoriesToValidate) {
        console.log(categoriesToValidate[index]);
        for (property in categories) {
            console.log(property)
            if (!categoriesToValidate[index].localeCompare(property))
                return;
        }
    }

    throw new CategoryError('Undefined Category');
}

module.exports = {
    // categories: categories,
    validateCategory: validateCategory
};