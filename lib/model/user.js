const User = require('../database/schemas/User');


var saveToDB = async function (user, token) {
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

    // await userModel.save(function (err, user) {
    //     if (err) {
    //         console.log(err);
    //         throw (err);
    //     } else {
    //         console.log('User saved');
    //     }
    // });
}

module.exports = {
    saveToDB: saveToDB
};
