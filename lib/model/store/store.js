const Store = require('../../database/schemas/store/Store');
const GeoPoint = require('geopoint')

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

    console.log('in filteredStores cb function');
    console.log(filteredStores);
    return filteredStores;
}

async function addStore(store) {
    let storeModel = new Store(store);
    console.log('store Model :');
    console.log(storeModel);
    await storeModel.save()
        .catch((error) => {
            console.log(error);
        });
}


module.exports = {
    findByCategory: findByCategory,
    addStore: addStore
}
