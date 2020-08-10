const db = require('../../../database/dbController');
const GeoPoint = require('geopoint')
const storeModel = require('../../../database/schemas/store/Store');

const findByCategory = async (category, distance, userCoordinates, id) => {

    let stores;
    stores = await db.findStore();

    //console.log(stores);

    // filter stores by location
    const filteredStores = await stores.filter(async function (store) {
        const { latitude, longtitude } = store.location.coordinates;
        const { latitude: userLatitudeBefParsing, longtitude: userLongtitudeBefParsing } = userCoordinates;

        const userLatitude = parseFloat(userLatitudeBefParsing);
        const userLongtitude = parseFloat(userLongtitudeBefParsing);
        const storeLocation = new GeoPoint(latitude, longtitude);
        const userLocation = new GeoPoint(userLatitude, userLongtitude);
        const distanceBetweenPoints = userLocation.distanceTo(storeLocation, true);

        // console.log(distanceBetweenPoints);
        return distanceBetweenPoints <= distance;
    });

    console.log(filteredStores);

    if (category === undefined)
        return filteredStores;

    //TODO: fix filtering deals
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

const addStore = async (store) => {
    return await db.saveStore(store);
}

const getStore = async (id) => {

    return id != null ? await storeModel.findById(id) :
        store = await storeModel.find({});
}


module.exports = {
    findByCategory,
    addStore,
    getStore
}
