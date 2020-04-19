// add this file to .gitignore (these are secret keys!)

module.exports = {
    mongodb:{
        dbURI: 'mongodb+srv://tomer:tomer@buzzy-ktdpc.mongodb.net/test?retryWrites=true&w=majority'
    },
    session: {
        cookieKey: 'somestringthathelpstoencryptthecookieyesyealkas'
    }
};