const dealsModel = require('../../database/schemas/deal/Deal');
const storeModel = require('../schemas/store/Store');
const { findStore } = require('../store/store');
const { errMsg } = require('../utils/constants');
const { validateObject } = require('../../lib/model/utils/validateUtils');
const { setTimeSinceEpoch } = require('../utils/time');


//to tomer---->
//try tou use 'findStore' function, this is function that 
//already written to find store by and filter
// params you pass to the function (id, name, etc...)
const saveDeal = async (dealToAdd) => {
    setTimeSinceEpoch(dealToAdd);

    const dealObj = new dealsModel(dealToAdd);
    await dealObj.save();

    const store = await storeModel.findById(dealToAdd.store);
    store.deals.push(dealObj.id);
    await store.save();


    return dealObj;
};

const editDeal = async (id, deal) => {
    setTimeSinceEpoch(deal);

    console.log(deal);
    // const oldDeal = await findDeal({ _id: id }).exec();
    // const { store: oldDealStoreID } = oldDeal;
    // const { store: newDealStoreID } = deal;

    // if (oldDealStoreID !== newDealStoreID) {
    //     moveDealToNewStore(oldDealStoreID, newDealStoreID);
    // }


    const updatedDeal = await dealsModel
        .findOneAndReplace({ _id: id }, deal,
            { returnOriginal: false })
        .exec();
    // const updatedDeal = deal;

    if (updatedDeal === null)
        throw new Error('deal id is invalid! there is no deal with id ' + id + ' in db!');

    console.log('deal was updated successfully!');

    return updatedDeal;
};

const moveDealToNewStore = (oldDealStoreID, newDealStoreID) => {
    storeModel.updateOne({_id: id}, )
}


const deleteDeal = async (id) => {
    const idObj = { _id: id };
    const dealToDelete = await findDeal(idObj);
    validateObject(dealToDelete[0], 'id is invalid, doesn\'t not match to any deal!');

    console.log('deal to delete :\n' + dealToDelete);

    deleteDealFromDealSchema(idObj);
    console.log('deal deleted from schemas deal');

    deleteDealFromStoreSchema({ deals: id });

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
            // throw new Error(err.message);
        });
}

const getDeal = async (id) => {
    return await dealsModel.findById(id);
}

const filterExpiredDeals = async () => {

    console.log('in filterExpiredDeals here');

    const dealsExpired = await findDeal({
        expiration_date: {
            $exists: true, $lt: Math.floor(Date.now() / 1000)
        }
    });

    console.log(dealsExpired);

    dealsExpired
        .forEach((deal) =>
            deleteDeal(deal._id)
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