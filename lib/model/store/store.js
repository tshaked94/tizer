const db = require('../../../database/dbController');
const { calculateDistanceBetweenPoints } = require('../utils/distance');
const storeModel = require('../../../database/schemas/store/Store');
const userStores = require('../user/userstores');
const store = require('../../../database/store/store');

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
        result.deals = (await getClosestStore(userCoordFloat)).deals;
        result.storesNearby = false;

        return result;
    }
    //else -> there are stores near by
    var closestDeals = getDealsfromStoresArray(filteredStores);
    result.storesNearby = true;

    console.log(closestDeals);
    //no category specified so return all deals nearby
    if (categoryRequested === undefined) {
        // result.stores = filteredStores;
        result.deals = closestDeals;
        return result;
    }


    //need to change all logic here 
    // filtered deals from filtered stores
    closestDeals.filter((deal) => {
        // store.deals = store.deals.filter((deal => {
        return deal.categories.includes(categoryRequested);
        // }))
    });

    //filter stores that has no deals match the distnace
    // filteredStores = filteredStores.filter((store) => store.deals.length !== 0);

    result.deals = closestDeals.length === 0 ? await getClosestStore(userCoordFloat) : closestDeals;
    console.log(result);
    return result;
}

const getStore = async (id) => {
    if (id) {
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

    return stores.sort((store1, store2) => {
        return calculateDistanceBetweenPoints(store1.location.coordinates, coordinates) -
            calculateDistanceBetweenPoints(store2.location.coordinates, coordinates);

    })[0];
}

const getDealsfromStoresArray = (filteredStores) => {
    var resultDeals = [];
    filteredStores.forEach((store) => {
        store.deals.forEach((deal) => resultDeals.push(deal));
        console.log(resultDeals);
    });

    return resultDeals;
};


module.exports = {
    findByCategory,
    editStore,
    deleteStore,
    getStore
}
