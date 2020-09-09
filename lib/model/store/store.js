const { findStore, editStore: editStoreInDB, deleteStore: deleteStoreInDB,
    findStoreRlReviews, filterExpiredDeals } = require('../../../database/dbController');
const { calculateDistanceBetweenPoints } = require('../utils/location');
const storeModel = require('../../../database/schemas/store/Store');
const { isValidTime, formatDate } = require('../utils/date');
const { isPhoneNumber, hasValue, isStringEqual } = require('../utils/validateUtils');
const { validateCategory } = require('./category');
const { isStringsEqual, validateObjectAndTypes } = require('../utils/validateUtils');
const moment = require('moment');
const location = require('../utils/location');
const openingHours = require('../../../database/schemas/store/openingHours');
// const openingHours = require('../../../database/schemas/store/openingHours');
const typesChecker = require('check-types');


const findByCategory = async (categoryRequested, distance, userCoordinates) => {

    filterExpiredDeals();
    let stores = await findStore();
    let result = {};

    //parsing user location from string to float
    const { latitude: userLatitudeBefParsing, longtitude: userLongtitudeBefParsing } = userCoordinates;

    const userLatitude = parseFloat(userLatitudeBefParsing);
    const userLongtitude = parseFloat(userLongtitudeBefParsing);
    const userCoordFloat = { latitude: userLatitude, longtitude: userLongtitude };

    // filter stores by location
    var filteredStores = await stores.filter((store) => {
        if (store.location.coordinates !== undefined) {
            const distanceBetweenPoints = calculateDistanceBetweenPoints(store.location.coordinates, userCoordFloat);
            return distanceBetweenPoints <= distance;
        }
        return false;
    });

    // console.log(filteredStores);
    var closestDeals = getDealsfromStoresArray(filteredStores);
    //if there are no stores nearby
    if (closestDeals.length === 0) {
        console.log('returning closest deals, no deals nearby');
        (await getClosestStoreWithDeals(userCoordFloat, result));
        return result;
    }
    //else -> there are stores near by
    result.dealsNearby = true;

    // var closestDeals = getDealsfromStoresArray(filteredStores);
    console.log('getting closest deals');
    console.log(categoryRequested);
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

    console.log('closest deals are:\n');
    console.log(closestDealsByCategory);

    // checking if after filtering by category there are still deals nearby
    closestDealsByCategory.length === 0 ? await getClosestStoreWithDeals(userCoordFloat, result) : result.deals = closestDealsByCategory;
    return result;
}

const getStore = async (id) => {
    if (id) {
        storeObj = await storeModel.findById(id)
            .populate('deals');
        store = storeObj.toObject();
        reviews = await findStoreRlReviews({ storeID: id });
        if (typeof reviews !== 'undefined' && reviews.length > 0) {
            reviewsObj = reviews.toObject()
            reviewsObj.forEach((val, index) => {
                valObj = val.toObject();
                valObj.updatedAt = formatDate(valObj.updatedAt);
                valObj.createdAt = formatDate(valObj.createdAt);
                reviewsObj[index] = valObj;
            });
            store.reviews = reviewsObj;
        }
        return store;
    }
    return await storeModel.find({})
        .populate('deals');
}

const editStore = async (id, store) => {
    return await editStoreInDB(id, store);
}

const deleteStore = async (id) => {
    return await deleteStoreInDB(id);
};

const getClosestStoreWithDeals = async (coordinates, result) => {
    result.dealsNearby = false;
    result.deals = [];
    let stores = await findStore();

    const storesSortedDistance = stores.sort((store1, store2) => {
        return calculateDistanceBetweenPoints(store1.location.coordinates, coordinates) -
            calculateDistanceBetweenPoints(store2.location.coordinates, coordinates);
    });

    for (indexStore in storesSortedDistance) {
        if (storesSortedDistance[indexStore].deals.length !== 0) {
            storesSortedDistance[indexStore].deals.forEach((deal) => {
                deal = deal.toObject();
                console.log(storesSortedDistance[indexStore].name);
                deal.storeName = storesSortedDistance[indexStore].name;
                result.deals.push(deal);
            });
            return;
        }
    }
}

const getDealsfromStoresArray = (filteredStores) => {
    var resultDeals = [];

    filteredStores.forEach((store) => {
        store.deals.forEach((deal) => {
            let dealObject = deal.toObject();
            dealObject.storeName = store.name;
            resultDeals.push(dealObject);
        })
    })

    return resultDeals;
};

const validateStore = (storeObject) => {
    const { categories, phoneNumber, location: { country, city, houseNumber, street }, isKosher,
        openingHours } = storeObject;

    //validate presence and types
    validateObjectAndTypes(storeObject);
    validateCategory(categories);

    if (!isPhoneNumber(phoneNumber))
        throw new Error('phone number is not valid in israel locale!');

    if (!isStringsEqual(country, 'israel'))
        throw new Error('country invalid, should to be israel');

    if (!openingHours.length >= 1)
        throw new Error('store must include opening Hours');
}

const getDealsStore = async (id) => {
    filterExpiredDeals();

    console.log('id is ' + id);
    var store;

    try {
        store = await findStore({ _id: id });
    } catch{
        throw new Error('id is invalid, doesn\'t match to any id store in db');
    }

    const deals = store[0].deals.map((deal) => deal._id);
    console.log('deal id array is ' + deals);

    return deals;
}
module.exports = {
    findByCategory,
    editStore,
    deleteStore,
    getStore,
    validateStore,
    getDealsStore
}
