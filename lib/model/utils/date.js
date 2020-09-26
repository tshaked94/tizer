const moment = require('moment');

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

const getTimeSinceEpoch = (date) => {
    const timeEpoch = date === undefined ? Date.now() : date;

    return Math.floor(timeEpoch / 1000);
}


module.exports = {
    formatDate,
    getTimeSinceEpoch,
    isValidTime,
    formatArray,
    validateFormat
};