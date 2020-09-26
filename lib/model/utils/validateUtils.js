const { VALID_PHONE_LENGTH } = require('./constants');
const validator = require('validator');

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