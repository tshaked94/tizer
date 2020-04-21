// add this file to .gitignore (these are secret keys!)

module.exports = {
    mongodb: {
        dbURI: 'mongodb+srv://tomer:tomer@buzzy-ktdpc.mongodb.net/test?retryWrites=true&w=majority'
    },
    session: {
        cookieKey: 'somestringthathelpstoencryptthecookieyesyealkas'
    },
    facebook:{
        appID: '659049138177638',
        appSecret: '29d3905e2d6b126f7756db877591803d'
    }
};