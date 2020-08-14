const dealsModel = require('../../database/schemas/deal/Deal');
const storeModel = require('../schemas/store/Store');

const saveDeal = async (dealToAdd) => {
    const dealObj = new dealsModel(dealToAdd);
    await dealObj.save();

    const store = await storeModel.findById(dealToAdd.store);
    store.deals.push(dealObj.id);
    await store.save();

    return dealObj;

};

const editDeal = async (id, deal) => {
    updatedDeal = await dealsModel.updateOne({_id: id}, deal);
    return updatedDeal;
};

const deleteDeal = async (id) => {
    deleted = await dealsModel.deleteOne({_id: id});
    return deleted;
};

module.exports = {
    saveDeal,
    editDeal,
    deleteDeal
}