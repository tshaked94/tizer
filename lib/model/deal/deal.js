const db = require('../../../database/dbController');

const addDeal = async (deal) => {
    db.saveDeal(deal);
};

const editDeal = async (id, deal) => {
    db.editDeal(id, deal);
};

const deleteDeal = async (id) => {
    db.deleteDeal(id);
};

const getDeal = (id) => {
    return db.getDeal(id);
};

module.exports = {
    getDeal,
    addDeal,
    editDeal,
    deleteDeal,
}