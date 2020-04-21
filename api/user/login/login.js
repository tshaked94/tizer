const router = require('../../../server').express.Router();
const login = require('../../../lib/model/user/login');
const user = require('../../../lib/database/schemas/User');

router.get('/', async (request, response) => {

    console.log('in api/user/login');

    const { id, token, email, name } = request.body;

    // console.log('first name is:' + firstName);
    // console.log('last name is:' + lastName);

    let newUser = {
        id: id,
        token: token,
        email: email,
        name: name
    };
    console.log('new user after init is: ' + newUser.toString());

    let userModel = new user(newUser);

    console.log('new user is ' + userModel.toString());

    // await userModel.save().catch(() => console.log('user has not been saved'));
    userModel.save();
    response.json(userModel);

    // token = request.body.activeToken;
    // var profile = login(token);
    // response.send(profile);
});

module.exports = router;


// app.post('/user/setAccessToken', (req, res) => {
//     console.log('welcome to set access token');
//     token = req.body.activeToken;
//     res.send('access token recieved: ' + token);
// });

// app.post('/user/getName', (req, res) => {
//     axios({
//         method: "GET",
//         url: `https://graph.facebook.com/me?access_token=${token}&fields=name`
//       }).then((response) => {
//           res.send(response);
//     });
// });