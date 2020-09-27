const dealsModel = require('../../database/schemas/deal/Deal');
const { storeModel } = require('../schemas/store/Store');
const { errMsg } = require('../utils/constants');
const { validateObject } = require('../../lib/model/utils/validateUtils');
const { setTimeSinceEpoch } = require('../utils/time');


const saveDeal = async (dealToAdd) => {
    setTimeSinceEpoch(dealToAdd);

    const dealObj = new dealsModel(dealToAdd);
    await dealObj.save()
        .catch((err) => {
            throw new Error(errMsg('save', 'deal') + err.message);
        });

    const store = await storeModel.findById(dealToAdd.store)
        .catch((err) => {
            throw new Error(errMsg('find', 'store') + err.message);
        });

    store.deals.push(dealObj.id);
    await store.save()
        .catch((err) => {
            throw new Error(errMsg('save', 'store') + err.message);
        });

    return dealObj;
};

const editDeal = async (id, deal) => {
    setTimeSinceEpoch(deal);

    console.log(deal);

    const updatedDeal = await dealsModel
        .findOneAndReplace({ _id: id }, deal,
            { returnOriginal: false })
        .exec()
        .catch((err) => {
            throw new Error(errMsg('find and replace', 'deal') + err.message);
        });

    if (updatedDeal === null)
        throw new Error('deal id is invalid! there is no deal with id ' + id + ' in db!');

    console.log('deal was updated successfully!');

    return updatedDeal;
};

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
        .catch((err) => {
            throw new Error(errMsg('delete', 'deals Array in store schema') + err.message);
        });
}

const deleteDealFromDealSchema = (filter) => {
    dealsModel.deleteMany(filter)
        .exec()
        .catch((err) => {
            throw new Error(errMsg('delete', 'deals') + err.message);
        });
}

const findDeal = async (filter) => {
    return await dealsModel.find(filter)
        .exec()
        .catch((err) => {
            console.log(errMsg('find', 'deals in array from store')
                + err.message);
        });
}

const getDeal = async (id) => {
    return await dealsModel.findById(id)
        .catch((err) => {
            throw new Error(errMsg('find', 'deal') + err.message);
        });;
}

const filterExpiredDeals = async () => {

    console.log('in filterExpiredDeals here');

    const dealsExpired = await findDeal({
        expiration_date: {
            $exists: true, $lt: Math.floor(Date.now() / 1000)
        }
    });

    console.log(dealsExpired);
    if (dealsExpired === undefined)
        return;

    dealsExpired
        .forEach((deal) =>
            deleteDeal(deal._id)
        );
}

module.exports = {
    // deleteArrayofDeals,
    getDeal,
    saveDeal,
    editDeal,
    deleteDeal,
    findDeal,
    filterExpiredDeals
}