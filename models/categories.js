const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name:String,
    subcategories:[{type:String}]
});

CategorySchema.set('collection','categories');

module.exports = mongoose.model('category',CategorySchema);