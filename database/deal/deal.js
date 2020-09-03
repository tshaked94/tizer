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

    const store = await storeModel.findById(dealToAdd.store);
    store.deals.push(dealObj.id);
    await store.save();

    return dealObj;
};

const editDeal = async (id, deal) => {
    updatedDeal = await dealsModel.updateOne({ _id: id }, deal);
    return updatedDeal;
};

const deleteDeal = async (id) => {
    const dealToDelete = await dealsModel.findById({ _id: id});
    console.log('--------');
    // await dealsModel.deleteOne({ _id: id });
    const res = await storeModel.findByIdAndUpdate(
        dealToDelete.store,
        { $pull: { deals: { id } } },function(err,model){
            if(err){
                 console.log(err);
                 return res.send(err);
              }
              return model;
            });
    // var store = await storeModel.findById(dealToDelete.store);
    // var deals = store.deals.toObject();
    // const index = deals.indexOf(id);
    // if (index > -1) {
    //     deals.splice(index, 1);
    // }
    // console.log(deals);
    // store.updateOne({_id: store._id}, {deals: deals});
    console.log(res);

    return 'deleted successfully';
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