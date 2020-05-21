const Store = require('../../database/schemas/store/Store');
const GeoPoint = require('geopoint')
const constants = require('../utils/constants');

async function findByCategory(category, distance, userCoordinates) {

    let stores;
    stores = await Store.find({ categories: category })
    console.log('after find stores' + stores);

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
    // return filteredStores;

    if (category === undefined)
        return filteredStores;

    console.log('-----------------showing deals categories---------------------');

    const result = filteredStores.filter((store) => {
        console.log('the store is' + store);
        store.deals.filter((deal) => {
            console.log('the deals is' + deal);

            deal.categories.filter((dealCategory) => {
                console.log('the category is' + dealCategory);

                console.log(dealCategory.localCompare(category) == 0);

            });
        });
    });


    console.log('the result is' + result);
    // const filteresDealsInStores = filteredStores.filter((store) => {
    //     store.deals.
    // });asdasdas

    console.log('filtered deals in filteres stores are:' + filteresDealsInStores);
    return filteresDealsInStores;
}

async function addStore(store) {
    let storeModel = new Store(store);
    console.log('store Model :');
    console.log(storeModel);
    await storeModel.save();
}


module.exports = {
    findByCategory: findByCategory,
    addStore: addStore
}
