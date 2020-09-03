const dealsModel = require('../../database/schemas/deal/Deal');
const storeModel = require('../schemas/store/Store');
const { findStore } = require('../store/store');


//to tomer---->
//try tou use 'findStore' function, this is function that 
//already written to find store by and filter
// params you pass to the function (id, name, etc...)
const saveDeal = async (dealToAdd) => {
    const dealObj = new dealsModel(dealToAdd);
    await dealObj.save();

    const store = await storeModel.findById(dealToAdd.storeID);
    store.deals.push(dealObj.id);
    await store.save();

    return dealObj;

};

const editDeal = async (id, deal) => {
    updatedDeal = await dealsModel.updateOne({ _id: id }, deal);
    return updatedDeal;
};

const deleteDeal = async (id) => {
    deleted = await dealsModel.deleteOne({ _id: id });
    return deleted;
};

const getDeal = async (id) => {
    return await dealsModel.findById(id);
}

module.exports = {
    getDeal,
    saveDeal,
    editDeal,
    deleteDeal
}