const GeoPoint = require('geopoint');
const isValidCoordinates = require('is-valid-coordinates')
const axios = require('axios');
const { LocationIQ: LocationIQKey } = require('../../config/keys');
const { FORMAT, ADDRESS, KEY, JSON } = require('./constants');
const { LocationIQ } = require('../../config/config');

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

const evaluateCoordinatesFromAddress = async (location) => {
    const { street, houseNumber, city, country } = location;
    street = evaluateStreetToAPI(street);

    const storeAddress = [street, houseNumber, city, country].join(' ');

    const params = new URLSearchParams([
        [KEY, LocationIQKey.private_key],
        [ADDRESS, storeAddress],
        [FORMAT, JSON]
    ]);

    console.log('before getting coordinate from \'LocationIQ\' API');

    const result = await axios.get(LocationIQ.url, { params })
        .catch((err) => {
            throw new Error('There was problem in finding coordinates for address ' + storeAddress + '\n'
                + 'make sure you address is valid\n' + 'The error:\n' + err.message);
        });

    return {
        latitude: result.data[0].lat,
        longtitude: result.data[0].lon
    };
}

const evaluateStreetToAPI = (street) => {
    let fixedStreet = "";

    string.forEach(word => {
        if (word.toLowerCase() !== 'street')
            fixedStreet = fixedStreet.concat(" ", word);
    });

    console.log('fixedStree is ' + fixedStreet);
    return fixedStreet;
}

module.exports = {
    calculateDistanceBetweenPoints,
    validateUserCoord,
    evaluateCoordinatesFromAddress
}