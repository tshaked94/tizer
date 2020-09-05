const { saveDeal: saveDealInDB, getDeal: getDealInDB,
    editDeal: editDealInDB, deleteDeal: deleteDealInDB } = require('../../../database/dbController');

const addDeal = async (deal) => {
    return saveDealInDB(deal);
};

const editDeal = async (id, deal) => {
    return editDealInDB(id, deal);
};

const deleteDeal = async (id) => {
    return deleteDealInDB(id);
};

const getDeal = (id) => {
    return getDealInDB(id);
};

module.exports = {
    getDeal,
    addDeal,
    editDeal,
    deleteDeal,
}