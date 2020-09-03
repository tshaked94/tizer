const { VALID_PHONE_LENGTH } = require('./constants');
const validator = require('validator');


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
    return isNaN(parseInt(str));
}

module.exports = {
    isPhoneNumber,
    hasValue,
    isStringsEqual,
    isStringNumber
}

