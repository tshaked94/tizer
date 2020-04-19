const router = require('../../../server').express.Router();
const login = require('../../../lib/model/user/login');

router.get('/', (request, response) => {
    token = request.body.activeToken;
    var profile = login(token);
    response.send(profile);
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