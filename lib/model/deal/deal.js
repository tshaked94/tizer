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

module.exports = {
    addDeal,
    editDeal,
    deleteDeal,
}