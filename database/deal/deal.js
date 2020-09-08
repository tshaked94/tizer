const dealsModel = require('../../database/schemas/deal/Deal');
const storeModel = require('../schemas/store/Store');
const { findStore } = require('../store/store');
const { errMsg } = require('../utils/constants');
const { validateObject } = require('../../lib/model/utils/validateUtils');
const { getCurrentTime24Format } = require('../utils/time');


//to tomer---->
//try tou use 'findStore' function, this is function that 
//already written to find store by and filter
// params you pass to the function (id, name, etc...)
const saveDeal = async (dealToAdd) => {
    dealToAdd.adate = Math.floor(Date.now() / 1000);
    const { expiration_date } = dealToAdd;
    console.log(expiration_date);

    if (expiration_date !== undefined)
        dealToAdd.expiration_date = new Date(dealToAdd.expiration_date).getTime();


    const dealObj = new dealsModel(dealToAdd);
    await dealObj.save();

    const store = await storeModel.findById(dealToAdd.store);
    store.deals.push(dealObj.id);
    await store.save();

    return dealObj;
};

const editDeal = async (id, deal) => {
    deal.edate = Date.now();
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
    // console.log(dealToDelete);
    validateObject(dealToDelete[0], 'id is invalid, doesn\'t not match to any deal!');

    console.log('deal to delete :\n' + dealToDelete);

    // const { store } = dealToDelete[0];
    deleteDealFromDealSchema(idObj);
    console.log('deal deleted from schemas deal');
    // console.log('id of the store is ' + store);

    deleteDealFromStoreSchema({ deals: id });
    // storeModel.updateMany({ deals: id },
    //     { $pull: { deals: id } },
    //     { multi: true })
    //     .exec()
    //     .catch(() => {
    //         throw new Error(errMsg('delete', 'deals Array in store schema'));
    //     });

    console.log('deal deleted from store object');
    return 'deal deleted successfully!';
};

const deleteDealFromStoreSchema = (filter) => {
    storeModel.updateMany(filter,
        { $pull: filter },
        { multi: true })
        .exec()
        .catch(() => {
            throw new Error(errMsg('delete', 'deals Array in store schema'));
        });
}

const deleteDealFromDealSchema = (filter) => {
    dealsModel.deleteMany(filter)
        .exec()
        .catch(() => {
            throw new Error(errMsg('delete', 'deals'));
        });
}

const findDeal = async (filter) => {
    return await dealsModel.find(filter)
        .exec()
        .catch((err) => {
            errMsg('find', 'deals in array from store')
            throw new Error(err.message);
        });
}

const getDeal = async (id) => {
    return await dealsModel.findById(id);
}

const filterExpiredDeals = async () => {

    console.log('in filterExpiredDeals here');
    const today = new Date().getDay();
    // const dealsID = await dealsModel.find({ expiration_date: { $exists: true, $lt: Date.now() } }, { _id: 1 }).exec();

    const allDeals = await findDeal({});
    const dealsID = allDeals.filter((deal) => {
        const { openingHours, expiration_date } = deal;

        if (openingHours[today] === undefined && expiration_date === undefined)
            return false;

        else if (expiration_date === undefined)
            return openingHours[today].closingTime < getCurrentTime24Format();

        else if (openingHours[today] === undefined)
            return expiration_date < Date.now();
    })
        .map((deal) => deal._id);

    console.log(dealsID);

    dealsID.map((deal) =>
        deal._id)
        .forEach((dealID) =>
            deleteDeal(dealID)
        );
}

module.exports = {
    getDeal,
    saveDeal,
    editDeal,
    deleteDeal,
    findDeal,
    filterExpiredDeals
}

//query for deals:

// $or: [{
    //     expiration_date: {
    //         $exists: true, $lt: Date.now()
    //     }
    // },
    // {
    //     $and: [{ expiration_date: undefined }, {
    //         $expr: {
    //             $let: {
    //                 vars: { hour: { $arrayElemAt: ["$openingHours", today] } },
    //                 in: { $gt: ['openingHours.$$hour.closingTime', new Date().getHours().toString() + ':00'] }
    //             }
    //         }
    //     }]
    // }]