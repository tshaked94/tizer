const db = require('../../../database/dbController');
const GeoPoint = require('geopoint')
const storeModel = require('../../../database/schemas/store/Store');

async function findByCategory(category, distance, userCoordinates, id) {

    let stores;
    stores = await db.findStore();

    //console.log(stores);

    // filter stores by location
    const filteredStores = await stores.filter(async function (store) {
        const latitude = store.location.coordinates.latitude;
        const longtitude = store.location.coordinates.longtitude;
        const userLatitude = parseFloat(userCoordinates.latitude);
        const userLongtitude = parseFloat(userCoordinates.longtitude);
        const storeLocation = new GeoPoint(latitude, longtitude);
        const userLocation = new GeoPoint(userLatitude, userLongtitude);
        const distanceBetweenPoints = userLocation.distanceTo(storeLocation, true);

        // console.log(distanceBetweenPoints);
        return distanceBetweenPoints <= distance;
    });

    console.log(filteredStores);

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
    const addedStore = await db.saveStore(store);
    return addedStore;
}

async function getStore(id) {
    var store;
    if(id) {
        store = await storeModel.findById(id);
    } else {
        store = await storeModel.find({});
    }
    return store;
}


module.exports = {
    findByCategory: findByCategory,
    addStore: addStore,
    getStore: getStore
}
