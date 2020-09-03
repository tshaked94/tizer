const { saveDeal: saveDealInDB, getDeal: getDealInDB,
    editDeal: editDealInDB, deleteDeal: deleteDealInDB } = require('../../../database/dbController');

const addDeal = async (deal) => {
    saveDealInDB(deal);
};

const editDeal = async (id, deal) => {
    editDealInDB(id, deal);
};

const deleteDeal = async (id) => {
    deleteDealInDB(id);
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