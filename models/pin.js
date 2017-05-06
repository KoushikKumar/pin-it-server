const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pinSchema = new Schema({
    imageUrl:String,
    createdBy:String,
    pinnedBy:[]
}, { minimize: false });

const ModelClass = mongoose.model('pin', pinSchema);

module.exports = ModelClass;