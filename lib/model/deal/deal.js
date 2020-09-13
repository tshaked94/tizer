const { saveDeal: saveDealInDB, getDeal: getDealInDB, editDeal: editDealInDB,
    deleteDeal: deleteDealInDB, filterExpiredDeals } = require('../../../database/dbController');
const { validateCategory } = require('../store/category');
const { validateObject } = require('../utils/validateUtils');
const { findStore } = require('../../../database/dbController');
const { findDeal } = require('../../../database/deal/deal');
const store = require('../../../database/store/store');
const deal = require('../../../database/deal/deal');
const { formatDate, formatArray, validateFormat } = require('../utils/date');
const { uploadBulkPhoto } = require('../utils/image');

const addDeal = async (deal) => {
    console.log('in add deal');
    await validateDeal(deal); //TODO - add validation to images

    if (deal.images !== 'undefined' && deal.images != null && Array.isArray(deal.images) && deal.images.length > 0) {
        deal.photos = await uploadBulkPhoto(deal.images, deal.userID);
        delete deal.images;
    }
    delete deal.userID;

    return saveDealInDB(deal);
};

const editDeal = async (id, deal) => {
    validateObject(await findDeal({ _id: id }), 'deal id is invalid, doesn\'t match to any deal');
    await validateDeal(deal);
    if (deal.images !== 'undefined' && deal.images != null && Array.isArray(deal.images) && deal.images.length > 0) {
        deal.photos = await uploadBulkPhoto(deal.images, deal.userID, 'store');
        delete deal.images;
    }
    delete deal.userID;
    return editDealInDB(id, deal);
};

const deleteDeal = async (id) => {
    validateObject(await findDeal({ _id: id }), 'deal id is invalid, doesn\'t match to any deal');
    return deleteDealInDB(id);
};

const getDeal = async (id) => {
    await filterExpiredDeals();

    validateObject(await findDeal({ _id: id }), 'deal id is invalid, doesn\'t match to any deal');
    var deal = await getDealInDB(id);
    deal = deal.toObject();
    if (typeof deal.updatedAt !== 'undefined') {
        deal.updatedAt = formatDate(deal.updatedAt);
    }
    if (typeof deal.createdAt !== 'undefined') {
        deal.createdAt = formatDate(deal.createdAt);
    }
    if (typeof deal.photos !== 'undefined' && deal.photos.length > 0) {
        deal.photos = formatArray(deal.photos, false);
    }
    return deal;
};

const getDealStore = async (id) => {
    const deal = await findDeal({ _id: id });
    console.log('deal is: ');
    console.log(deal);
    const { store } = deal[0];

    console.log('store ID is:');
    console.log(store);
    const storeObj = await findStore({ _id: store });
    return storeObj[0];
}

const getDealsLocation = async (dealsID) => {

    await validateDealsID(dealsID);
    console.log('in get Deals Location');
    console.log(dealsID);

    const stores = dealsID.map((dealID) => {
        return getDealStore(dealID);
    })

    return (await (Promise.all(stores))).map((store) => {
        return store.location;
    });
}

const validateDeal = async (deal) => {
    //validate deal
    console.log('in validate Deal');
    const { categries, store } = deal;
    validateCategory(categries);
    console.log('before find store: ' + store);
    const { expiration_date } = deal;
    
    if (expiration_date !== undefined)
    validateFormat(expiration_date, 'MM/DD/YY', 'expiration_date');

    validateObject(await findStore({ _id: store }), 'id is invalid doesn\'t compatible to any store ');
}
const validateDealsID = async (dealsID) => {
    const dealsPromises = dealsID.map((dealID) => {
        return findDeal({ _id: dealID });
    });

    const deals = Promise.all(dealsPromises);

    (await deals).forEach((deal) => {
        validateObject(deal,
            'deal id is invalid, doesn\'t match to any deal');
    });
}

setInterval(filterExpiredDeals, 1800000);

module.exports = {
    getDeal,
    addDeal,
    editDeal,
    deleteDeal,
    filterExpiredDeals,
    getDealsLocation
}
// const dealsLocations = dealsID.map((dealID) => {
//     const deal = findDeal({ _id: dealID });
//     console.log('deal is: ');
//     console.log(deal);
//     const { store } = deal;
//     console.log('storeID is: ');
//     console.log(store);
//     const currStore = findStore({ _id: store });
//     // const { location } = currStore;
//     // console.log('location is: ');
//     // console.log(location);

//     // return location;

//     return currStore;
// });

// return Promise.all(dealsLocations);