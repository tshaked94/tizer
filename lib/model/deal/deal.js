const { saveDeal: saveDealInDB, getDeal: getDealInDB, editDeal: editDealInDB,
    deleteDeal: deleteDealInDB, filterExpiredDeals } = require('../../../database/dbController');
const { validateCategory } = require('../store/category');
const { validateObject } = require('../utils/validateUtils');
const { findStore } = require('../../../database/dbController');
const { findDeal } = require('../../../database/deal/deal');

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

module.exports = {
    getDeal,
    addDeal,
    editDeal,
    deleteDeal,
    filterExpiredDeals
}