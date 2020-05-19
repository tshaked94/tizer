const User = require('../database/schemas/user/User');


async function saveToDB(user, token) {
    var date = new Date();
    date.setMonth(date.getMonth() + 2);
    var expirationDate = date.getTime();
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

module.exports = {
    saveToDB: saveToDB
};
