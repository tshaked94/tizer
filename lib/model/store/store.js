const Store = require('../../database/schemas/store/Store');
var GeoPoint = require('geopoint')

var findByCategory = async function(category, distance, userCoordinates){
    await Store.find({categories: category})
    .then(async (stores) => {
        // filter stores by location
        const filteredStores = stores.filter(async function(store){
            var latitude = store.location.coordinates.latitude;
            var longtitude = store.location.coordinates.longtitude;
            var userLatitude = parseFloat(userCoordinates.latitude);
            var userLongtitude = parseFloat(userCoordinates.longtitude);
            var storeLocation = new GeoPoint(latitude, longtitude);
            var userLocation = new GeoPoint(userLatitude, userLongtitude);
            var distanceBetweenPoints = userLocation.distanceTo(storeLocation, true);
            return distanceBetweenPoints <= distance;
        });
        //TODO - filtered stores is not updated yet. we need to wait for filter and then return the values.
        console.log(filteredStores);
        return filteredStores;
    });
}

var addStore = async function(store){
    let storeModel = new Store(store);
    console.log('store Model :');
    console.log(storeModel)
    await storeModel.save().then((res) => {
        return res.name;
    });
};

module.exports = {
    findByCategory: findByCategory,
    addStore : addStore
}
