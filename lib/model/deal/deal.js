const { saveDeal: saveDealInDB, getDeal: getDealInDB, editDeal: editDealInDB,
    deleteDeal: deleteDealInDB, filterExpiredDeals } = require('../../../database/dbController');
const { validateCategory } = require('../store/category');
const { validateObject } = require('../utils/validateUtils');
const { findStore } = require('../../../database/dbController');
const { findDeal } = require('../../../database/deal/deal');
const store = require('../../../database/store/store');
const deal = require('../../../database/deal/deal');

const addDeal = async (deal) => {
    console.log('in add deal');
    console.log(deal);
    await validateDeal(deal);
    return saveDealInDB(deal);
};

const editDeal = async (id, deal) => {
    validateObject(await findDeal({ _id: id }), 'deal id is invalid, doesn\'t match to any deal');
    await validateDeal(deal);
    return editDealInDB(id, deal);
};

const deleteDeal = async (id) => {
    validateObject(await findDeal({ _id: id }), 'deal id is invalid, doesn\'t match to any deal');
    return deleteDealInDB(id);
};

const getDeal = async (id) => {
    await filterExpiredDeals();

    validateObject(await findDeal({ _id: id }), 'deal id is invalid, doesn\'t match to any deal');
    return await getDealInDB(id);
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
    const foundedStore = await findStore({ _id: store });
    console.log(foundedStore);

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