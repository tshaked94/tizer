const getCurrentTime24Format = () => {
    return new Date().toLocaleTimeString('he-IL', { hour12: false });
}

module.exports = {

    getCurrentTime24Format
}