// add this file to .gitignore (these are secret keys!)

module.exports = {
    google:{
        clientID: '',
        clientSecret:''
    },
    facebookAuth: {
        clientID: '659049138177638',
        clientSecret: '29d3905e2d6b126f7756db877591803d',
        callbackURL: '/facebook/callback'
    },
    mongodb:{
        dbURI: 'mongodb+srv://tomer:tomer@buzzy-ktdpc.mongodb.net/test?retryWrites=true&w=majority'
    },
    session: {
        cookieKey: 'somestringthathelpstoencryptthecookieyesyealkas'
    }
};