const User = require('../schemas/user/User');
const { getDateTime, timeUnits } = require('../dbController');
const { errMsg } = require('../utils/constants')

const saveToDB = async (user, token) => {
    const expirationDate = getDateTime(timeUnits.month, 2);
    const { id, email, name, birthday, link, picture: { data } } = user;

    const newUser = {
        facebookID: id,
        tizerToken: token,
        tokenExpiredDate: expirationDate,
        email: email,
        name: name,
        birthday: birthday,
        link: link,
        picture: data
    };

    const userModel = new User(newUser);


    await userModel.save();
    console.log('user saved');
}

const findUser = (facebookID, tizerToken) => {
    return User.findOne(facebookID, tizerToken)
        .catch((err) => {
            errMsg('finding, user');
        });
}

const updateUser = (facebookID, update) => {
    return User.updateOne(facebookID, update)
        .catch((err) => {
            errMsg('updating', 'user');
        });
}

module.exports = {
    saveToDB,
    findUser,
    updateUser
};
