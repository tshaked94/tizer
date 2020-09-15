const User = require('../schemas/user/User');
const { getDateTime, timeUnits } = require('../utils/time');
const { errMsg } = require('../utils/constants')

const saveToDB = async (user, token) => {
    const expirationDate = getDateTime(timeUnits.month, 2);
    const { id, email, name, birthday, link, picture: { data },
        longLivedAccessToken } = user;

    const newUser = {
        facebookID: id,
        tizerToken: token,
        tokenExpiredDate: expirationDate,
        email: email,
        name: name,
        birthday: birthday,
        link: link,
        picture: data,
        longLivedAccessToken: longLivedAccessToken
    };

    const userModel = new User(newUser);
    console.log('=============================');
    console.log(userModel);

    await userModel.save();
    console.log('user saved');
}

const findUser = async (facebookID) => {
    return await User.findOne(facebookID)
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
