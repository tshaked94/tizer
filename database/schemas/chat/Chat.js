const mongoose = require('mongoose');
const { Schema } = mongoose;

const { schema: messageSchema } = require('./Message');

const chatSchema = new Schema({
    messages: [messageSchema]
});

const Chat = mongoose.model('chat', chatSchema);

module.exports = {
    model: Chat,
    schema: chatSchema
}; 