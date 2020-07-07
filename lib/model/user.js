// const User = require('../../database/schemas/user/User');
// const date = require('../model/utils/date');

// async function saveToDB(user, token) {
//     var expirationDate = date.getDateTime(date.timeUnits.month, 2);
//     let newUser = {
//         facebookID: user.id,
//         tizerToken: token,
//         tokenExpiredDate: expirationDate,
//         email: user.email,
//         name: user.name,
//         birthday: user.birthday,
//         link: user.link,
//         picture: user.picture.data
//     };

//     let userModel = new User(newUser);


//     await userModel.save()
//         .then(() => console.log('user saved'));

// }

// module.exports = {
//     saveToDB: saveToDB
// };
