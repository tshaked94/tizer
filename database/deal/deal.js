const dealsModel = require('../../database/schemas/deal/Deal');
const storeModel = require('../schemas/store/Store');
const { findStore } = require('../store/store');
const { errMsg } = require('../utils/constants');
const { validateObject } = require('../../lib/model/utils/validateUtils');


//to tomer---->
//try tou use 'findStore' function, this is function that 
//already written to find store by and filter
// params you pass to the function (id, name, etc...)
const saveDeal = async (dealToAdd) => {
    dealToAdd.adate = Math.floor(Date.now() / 1000);
    const dealObj = new dealsModel(dealToAdd);
    await dealObj.save();

    const store = await storeModel.findById(dealToAdd.store);
    store.deals.push(dealObj.id);
    await store.save();

    return dealObj;
};

const editDeal = async (id, deal) => {
    deal.edate = Math.floor(Date.now() / 1000);
    const updatedDeal = await dealsModel.findOneAndUpdate({ _id: id }, { $set: deal },
        {
            useFindAndModify: false,
            returnOriginal: false
        });

    if (updatedDeal === null)
        throw new Error('deal id is invalid! there is no deal with id ' + id + ' in db!');

    console.log('deal was updated successfully!');

    return updatedDeal;
};

const deleteDeal = async (id) => {
    const idObj = { _id: id };
    // var dealToDelete;

    // try {
    const dealToDelete = await findDeal(idObj);
    // } catch{
    // throw new Error("id is invalid, doesn\'t not match to any deal!");
    // }
    console.log(dealToDelete);
    validateObject(dealToDelete[0], 'id is invalid, doesn\'t not match to any deal!');

    console.log('deal to delete :\n' + dealToDelete);

    // const { store } = dealToDelete[0];
    deleteDealFromDealSchema(idObj);
    console.log('deal deleted from schemas deal');
    // console.log('id of the store is ' + store);

    storeModel.updateMany({ deals: id },
        { $pull: { deals: id } },
        { multi: true })
        .exec()
        .catch(() => {
            throw new Error(errMsg('delete', 'deals Array in store schema'));
        });

    console.log('deal deleted from store object');
    return 'deal deleted successfully!';
};

const deleteDealFromDealSchema = (filter) => {
    dealsModel.deleteOne(filter)
        .exec()
        .catch(() => {
            throw new Error(errMsg('delete', 'deals'));
        });
}

const findDeal = async (filter) => {
    return await dealsModel.find(filter)
        .exec()
        .catch(() => {
            throw new Error(errMsg('find', 'deals in array from store'));
        });
}

const getDeal = async (id) => {
    return await dealsModel.findById(id);
}

module.exports = {
    getDeal,
    saveDeal,
    editDeal,
    deleteDeal
}