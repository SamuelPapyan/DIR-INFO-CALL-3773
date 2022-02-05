const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
    content:String,
    organizations:[{type:Schema.Types.ObjectId, ref:'Organization'}]
},{timestamps:true, versionKey:false});

TagSchema.set('collection','tags');

module.exports = mongoose.model('Tag',TagSchema);