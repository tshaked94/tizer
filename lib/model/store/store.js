const { findStore, editStore: editStoreInDB, deleteStore: deleteStoreInDB, deleteTizer: deleteTizerInDB,
    findStoreRlReviews, filterExpiredDeals } = require('../../../database/dbController');
const { calculateDistanceBetweenPoints } = require('../utils/location');
const storeModel = require('../../../database/schemas/store/Store');
const { evaluateCoordinatesFromAddress } = require('../utils/location');
const { formatDate, formatArray } = require('../utils/date');
const { isStringsEqual, isPhoneNumber, validateAll, Validator, validateObject } = require('../utils/validateUtils');
const { validateCategory } = require('./category');
const store = require('../../../database/store/store');
// const { isStringsEqual, validateObjectAndTypes } = require('../utils/validateUtils');


const findByCategory = async (categoryRequested, distance, userCoordinates) => {

    validateCategory(categoryRequested);
    validateAll(new Validator('distance', 'isStringNumber', distance),
        new Validator('userCoordinates.latitude', 'isStringNumber', userCoordinates.latitude),
        new Validator('userCoordinates.longtitude', 'isStringNumber', userCoordinates.longtitude));

    await filterExpiredDeals();
    let stores = await findStore();
    console.log(stores);
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

const getClosestStoreWithDeals = async (coordinates, result) => {
    console.log(coordinates);
    console.log(result);
    result.dealsNearby = false;
    let stores = await findStore();

    const storesSortedDistance = stores.sort((store1, store2) => {
        return calculateDistanceBetweenPoints(store1.location.coordinates, coordinates) -
            calculateDistanceBetweenPoints(store2.location.coordinates, coordinates);
    });

    for (indexStore in storesSortedDistance) {
        if (storesSortedDistance[indexStore].deals.length !== 0) {
            result.deals = storesSortedDistance[indexStore].deals;
            return;
        }
    }
}

const getStore = async (id) => {
    validateObject(await findStore({ _id: id }),
        'id is invalid doesn\'t compatible to any store ');

    if (id) {
        storeObj = await storeModel.findById(id)
            .populate('deals');
        var store = storeObj.toObject();
        if(typeof store.updatedAt !== 'undefined') {
            store.updatedAt = formatDate(store.updatedAt);
        }
        if(typeof store.createdAt !== 'undefined') {
            store.createdAt = formatDate(store.createdAt);
        }
        if (typeof store.deals !== 'undefined' && store.deals.length > 0) {
            store.deals = formatArray(store.deals, false);
        }
        if (typeof store.tizers !== 'undefined' && store.tizers.length > 0) {
            store.tizers = formatArray(store.tizers, false);
        }
        reviews = await findStoreRlReviews({ storeID: id });
        if (typeof reviews !== 'undefined' && reviews.length > 0) {
            reviewsObj = reviews.toObject()
            reviwesObj = formatArray(reviewsObj, true);
            store.reviews = reviewsObj;
        }
        return store;
        }
    return await storeModel.find({})
        .populate('deals');
}

const editStore = async (id, store) => {
    validateObject(await findStore({ _id: id }), 'id is invalid doesn\'t compatible to any store ');
    validateStore(store);
    const { location } = store;

    store.location.coordinates = await evaluateCoordinatesFromAddress(location);
    console.log('before updating store, store is ========>');
    console.log(store);

    return await editStoreInDB(id, store);
}

const deleteStore = async (id) => {
    validateObject(await findStore({ _id: id }), 'id is invalid doesn\'t compatible to any store ');
    return await deleteStoreInDB(id);
};

const validateStore = (storeObject) => {
    const { categories, phoneNumber, location: { country }, openingHours } = storeObject;

    //validate presence and types
    // validateObjectAndTypes(storeObject);
    validateCategory(categories);

    if (!isPhoneNumber(phoneNumber))
        throw new Error('phone number is not valid in israel locale!');

    if (!isStringsEqual(country, 'israel'))
        throw new Error('country invalid, should to be israel');

    if (!openingHours.length >= 1)
        throw new Error('store must include opening Hours');
}

const getDealsStore = async (id) => {
    await filterExpiredDeals();
    console.log('id is ' + id);
    const store = await findStore({ _id: id });

    validateObject(store, 'id is invalid doesn\'t compatible to any store ');

    console.log('in here----->');
    console.log(store);
    const deals = store[0].deals.map((deal) => deal._id);
    console.log('deal id array is ' + deals);

    return deals;
}

const deleteTizer = async (tizerID, storeID) => {
    validateObject(await findStore({_id: storeID, tizers: { $elemMatch: {_id: tizerID }}}), 'Invalid Tizer - not found in DB');
    return await deleteTizerInDB(tizerID, storeID);
};

module.exports = {
    findByCategory,
    editStore,
    deleteStore,
    getStore,
    validateStore,
    getDealsStore,
    deleteTizer
}
