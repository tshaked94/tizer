const getCurrentTime24Format = () => {
    return new Date().toLocaleTimeString('he-IL', { hour12: false });
}

const setTimeSinceEpoch = (object) => {
    const { expiration_date } = object;
    if (expiration_date !== undefined)
        object.expiration_date = Math.floor(new Date(expiration_date).getTime() / 1000);
}

module.exports = {
    setTimeSinceEpoch,
    getCurrentTime24Format
}