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

const findUser = async (facebookID, tizerToken) => {
    return await User.findOne(facebookID, tizerToken)
        .catch((err) => {
            errMsg('finding, user');
        });
}

const updateUser = async (facebookID, update) => {
    return await User.updateOne(facebookID, update);
        // .catch((err) => {
        //     throw new Error()
        // });
}

module.exports = {
    saveToDB,
    findUser,
    updateUser
};
