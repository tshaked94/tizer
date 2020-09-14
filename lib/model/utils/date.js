const moment = require('moment');

const timeUnits = {
    day: 'day',
    month: 'month',
    year: 'year'
}
Object.freeze(timeUnits);

// var date = new Date();
// date.setMonth(date.getMonth() + 2);


const getDateTime = (time, amount) => {
    var date = new Date();
    switch (time) {
        case timeUnits.day:
            date.setDate(date.getDate() + amount);
            break;
        case timeUnits.month:
            date.setMonth(date.getMonth() + amount);
            break;
        case timeUnits.year:
            date.setFullYear(date.getFullYear() + amount);
            break;
        default:
            date = null;
    }
    return Math.floor(date.getTime() / 1000);
}

const formatDate = function (time) {
    const formattedTime = moment(new Date(time)).format('DD/MM/YYYY h:mm');
    return formattedTime;
}

const isValidTime = (timeStr) => {
    return moment(timeStr, "HH:mm", true).isValid();
}

const formatArray = function (arr, toObj = true) {
    var res = [];
    arr.forEach((val, index) => {
        if (toObj == true) {
            valObj = val.toObject();
        } else {
            valObj = val;
        }
        if (typeof valObj.updatedAt !== 'undefined') {
            valObj.updatedAt = formatDate(valObj.updatedAt);
        }
        if (typeof valObj.createdAt !== 'undefined') {
            valObj.createdAt = formatDate(valObj.createdAt);
        }
        if (toObj == true) {
            arr[index] = valObj;
        } else {
            res[index] = valObj;
        }
    });
    return res;
}

const validateFormat = (dateString, formatString, varName) => {
    if (!moment(dateString, formatString, true).isValid())
        throw new Error(varName + ' is not in format of ' + formatString);
}

module.exports = {
    timeUnits,
    formatDate,
    getDateTime,
    isValidTime,
    formatArray,
    validateFormat
};