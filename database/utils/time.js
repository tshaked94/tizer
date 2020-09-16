const getCurrentTime24Format = () => {
    return new Date().toLocaleTimeString('he-IL', { hour12: false });
}

const setTimeSinceEpoch = (object) => {
    const { expiration_date } = object;

    if (expiration_date !== undefined)
        object.expiration_date = Math.floor(new Date(expiration_date).getTime() / 1000);

    // object.expiration_date = (expiration_date !== undefined) ?
    // Math.floor(new Date(expiration_date).getTime() / 1000)
    // : undefined;
}

const timeUnits = {
    day: 'day',
    month: 'month',
    year: 'year'
}
Object.freeze(timeUnits);

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


module.exports = {
    setTimeSinceEpoch,
    getCurrentTime24Format,
    timeUnits,
    getDateTime
}