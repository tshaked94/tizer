const db = require('../../../database/dbController');
const { calculateDistanceBetweenPoints } = require('../utils/distance');
const storeModel = require('../../../database/schemas/store/Store');
const store = require('../../../database/store/store');
const { resolveInclude } = require('ejs');

const findByCategory = async (categoryRequested, distance, userCoordinates) => {

    let stores = await db.findStore();
    let result = { stores: undefined, storesNearby: undefined };

    //parsing user location from string to float
    const { latitude: userLatitudeBefParsing, longtitude: userLongtitudeBefParsing } = userCoordinates;
    const userLatitude = parseFloat(userLatitudeBefParsing);
    const userLongtitude = parseFloat(userLongtitudeBefParsing);
    const userCoordFloat = { latitude: userLatitude, longtitude: userLongtitude };

    // filter stores by location
    let filteredStores = await stores.filter((store) => {
        const distanceBetweenPoints = calculateDistanceBetweenPoints(store.location.coordinates, userCoordFloat);
        return distanceBetweenPoints <= distance;
    });

    // console.log(filteredStores);
    //if there are no stores nearby
    if (filteredStores.length === 0) {
        result.stores = await getClosestStore(userCoordFloat);
        result.storesNearby = false;

        return result;
    }
    //else -> there are stores near by
    result.storesNearby = true;

    //no category specified so return all stores nearby
    if (categoryRequested === undefined) {
        result.stores = filteredStores;
        return result;
    }


    // filtered deals from filtered stores
    filteredStores.forEach((store) => {
        store.deals = store.deals.filter((deal => {
            return deal.categories.includes(categoryRequested);
        }))
    });

    //filter stores that has no deals match the distnace
    filteredStores = filteredStores.filter((store) => store.deals.length !== 0);

    result.stores = filteredStores.length === 0 ? await getClosestStore(userCoordFloat) : filteredStores;
    return result;
}

const addStore = async (store) => {
    return await db.saveStore(store);
}

const getStore = async (id) => {
    if(id) {
        return await storeModel.findById(id)
                               .populate('deals');
    }
    return await storeModel.find({})
                           .populate('deals');
}

const editStore = async (id, store) => {
    return await db.editStore(id, store);
}

const deleteStore = async (id) => {
    return await db.deleteStore(id);
};

const getClosestStore = async (coordinates) => {
    console.log(coordinates);
    let stores = await db.findStore();
    let minDistance = calculateDistanceBetweenPoints(stores[0].location.coordinates, coordinates);
    var minDisStore = store[0];

    stores.forEach((store) => {
        let currentDistance = calculateDistanceBetweenPoints(store.location.coordinates, coordinates);
        if (currentDistance < minDistance) {
            minDistance = currentDistance;
            minDisStore = store;
        }
    });
    return (minDisStore);
}


module.exports = {
    findByCategory,
    addStore,
    editStore,
    deleteStore,
    getStore
}
