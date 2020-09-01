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
    var filteredStores = await stores.filter((store) => {
        const distanceBetweenPoints = calculateDistanceBetweenPoints(store.location.coordinates, userCoordFloat);
        return distanceBetweenPoints <= distance;
    });

    // console.log(filteredStores);
    //if there are no stores nearby
    if (filteredStores.length === 0) {
        console.log('returning closest store, no stores nearby');
        result.deals = (await getClosestStore(userCoordFloat)).deals;
        result.storesNearby = false;

        return result;
    }
    //else -> there are stores near by
    result.storesNearby = true;
    var closestDeals = getDealsfromStoresArray(filteredStores);

    //no category specified so return all deals nearby
    if (categoryRequested === undefined) {
        console.log('no category requested');
        result.deals = closestDeals;
        return result;
    }


    // filtered deals by category
    const closestDealsByCategory = closestDeals.filter((deal) => {
        for (var prop in categoryRequested) {
            if (deal.categories.includes(categoryRequested[prop]))
                return true;
        }
        return false;

    });

    // checking if after filtering by category there are still deals nearby
    // needed to handle situation if there were no deals around and we are returning closest store, change flag of dealsNearby
    result.deals = closestDealsByCategory.length === 0 ? await getClosestStore(userCoordFloat) : closestDealsByCategory;
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
    var dealObject;

    filteredStores.forEach((store) => {
        store.deals.forEach((deal) => {
            dealObject = deal.toObject();
            dealObject.storeName = store.name;
            resultDeals.push(dealObject);
        })
    })

    return resultDeals;
};


module.exports = {
    findByCategory,
    editStore,
    deleteStore,
    getStore
}
