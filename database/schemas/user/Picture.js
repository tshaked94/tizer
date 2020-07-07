const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pictureSchema = new Schema({
    height: { type: Number },
    is_silhouette: { type: Boolean },
    url: { type: String },
    width:{ type: Number},
});

const Picture = mongoose.model('picture', pictureSchema);

module.exports ={
    model: Picture,
    schema: pictureSchema 
}; 