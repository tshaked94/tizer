const GeoPoint = require('geopoint');
//const isValidCoordinates = require('is-valid-coordinates')



const calculateDistanceBetweenPoints = (coord1, coord2) => {
    const { latitude: latitude1, longtitude: longtitude1 } = coord1;
    const { latitude: latitude2, longtitude: longtitude2 } = coord2;

    const coord1Location = new GeoPoint(latitude1, longtitude1);
    const coord2Location = new GeoPoint(latitude2, longtitude2);

    return coord1Location.distanceTo(coord2Location, true);
}

//unused function - erase if not use it at the end
const validateUserCoord = (userCoord) => {
    if (isValidCoordinates(userCoord))
        throw new Error('Unvalid Coordinates');
}

module.exports = {
    calculateDistanceBetweenPoints,
    validateUserCoord
}