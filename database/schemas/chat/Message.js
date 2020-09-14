const mongoose = require('mongoose');
const { Schema } = mongoose;


const messageSchema = new Schema({
    user: {
        id: { type: String },
        name: { type: String },
        avatar: { type: String }
    },
    text: { type: String },
}, { timestamps: true });

const Message = mongoose.model('message', messageSchema);

module.exports = {
    model: Message,
    schema: messageSchema
}; 