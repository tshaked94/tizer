const { VALID_PHONE_LENGTH } = require('./constants');
const validator = require('validator');
const typesChecker = require('check-types');

class Validator {
    constructor(name, func, value) {
        this.name = name;
        this.func = func;
        this.value = value;
    }
    validate() {
        const funcString = this.func +'(this.value)';
        console.log(isStringNumber(this.value));
        console.log(this.value);
        if (!(eval(funcString)))
            throw new Error('object ' + this.name + ' has invalid type');
        else
            console.log('type is valid!!');
    }
}



const isPhoneNumber = (phone) => {
    const fixedPhone = phone.replace(/[-()\s]/g, '');

    return (validator.isMobilePhone(fixedPhone, 'he-IL') ||
        fixedPhone.length === VALID_PHONE_LENGTH);
}

const hasValue = (value) => {
    return (typeof value !== 'undefined');
}

const isStringsEqual = (str1, str2) => {
    return str1.toLowerCase() === str2.toLowerCase();
}

const isStringNumber = (str) => {
    return !isNaN(Number(str));
}

const validateObject = (obj, msg) => {
    if (obj === null || obj === undefined || obj.length === 0)
        throw new Error(msg);
}

const validateAll = (...arr) => {
    for (index in arr)
        arr[index].validate();
}

module.exports = {
    isPhoneNumber,
    hasValue,
    isStringsEqual,
    isStringNumber,
    validateObject,
    validateAll,
    Validator
}
// const validateType = (key, value) => {
//     if (typesChecker.array(key))
//         return;

//     const type = typeof key;
//     const funcString = 'typesChecker.' + type + '(key)'
//     console.log(funcString);

//     if (type === 'string') {
//         console.log(key);
//         console.log(value);
//         if (!typesChecker.nonEmptyString(value))
//             throw new Error('string ' + key + ' is empty');
//     }

//     if (!(eval(funcString)))
//         throw new Error('object ' + key + ' has invalid type');
// }

// const validateObjectAndTypes = (obj) => {
    //     Object.keys(obj).forEach((prop) => {
        //         console.log('do some stuff here with key: ' + prop + ' and ' + obj[prop]);
        //         validateType(obj[prop], prop);
//         validateObject(obj[prop], prop);

//         if (typeof obj[prop] === 'object')
//             validateObjectAndTypes(obj[prop]);
//     })
// }
