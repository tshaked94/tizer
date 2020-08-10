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
        case timeUnit.day:
            date.setDate(date.getDate() + amount);
            break;
        case timeUnit.month:
            date.setMonth(date.getMonth() + amount);
            break;
        case timeUnit.year:
            date.setFullYear(date.getFullYear() + amount);
            break;
        default:
            date = null;
    }
    return date.getTime();
}

module.exports = {
    timeUnits,
    getDateTime
};