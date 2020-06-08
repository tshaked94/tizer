const Store = require('../../database/schemas/store/Store');
const GeoPoint = require('geopoint')
const constants = require('../utils/constants');

async function findByCategory(category, distance, userCoordinates) {

    let stores;
    stores = await Store.find({ categories: category })

    // filter stores by location
    const filteredStores = await stores.filter(async function (store) {
        const latitude = store.location.coordinates.latitude;
        const longtitude = store.location.coordinates.longtitude;
        const userLatitude = parseFloat(userCoordinates.latitude);
        const userLongtitude = parseFloat(userCoordinates.longtitude);
        const storeLocation = new GeoPoint(latitude, longtitude);
        const userLocation = new GeoPoint(userLatitude, userLongtitude);
        const distanceBetweenPoints = userLocation.distanceTo(storeLocation, true);
        return distanceBetweenPoints <= distance;
    });

    if (category === undefined)
        return filteredStores;

    filteredStores.forEach(async (store) => {
        filtered = [];
        store.deals.forEach(async (deal) => {
            if (deal.categories.includes(category)) {
                filtered.push(deal);
            }
        });
        store.deals = filtered;

    });

    return filteredStores;
}

async function addStore(store) {
    let storeModel = new Store(store);
    await storeModel.save();
    return 'Successfully Saved';
}


module.exports = {
    findByCategory: findByCategory,
    addStore: addStore
}
