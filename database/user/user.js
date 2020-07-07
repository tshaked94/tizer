const User = require('../schemas/user/User');
const date = require('../dbController').date;

async function saveToDB(user, token) {
    var expirationDate = date.getDateTime(date.timeUnits.month, 2);
    let newUser = {
        facebookID: user.id,
        tizerToken: token,
        tokenExpiredDate: expirationDate,
        email: user.email,
        name: user.name,
        birthday: user.birthday,
        link: user.link,
        picture: user.picture.data
    };

    let userModel = new User(newUser);


    await userModel.save()
        .then(() => console.log('user saved'));
}

async function findUser(facebookID, tizerToken)
{
    return User.findOne(facebookID, tizerToken);
}

async function updateUser(facebookID, tizerToken)
{
    return User.updateOne(facebookID, tizerToken);
}

module.exports = {
    saveToDB: saveToDB,
    findUser: findUser,
    updateUser: updateUser
};
