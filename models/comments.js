const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content:String,
    author:{type:Schema.Types.ObjectId, ref:'User'},
    organizationId:{type:Schema.Types.ObjectId, ref:'Organization'}
},{timestamps:true, versionKey:false});

CommentSchema.set('collection','comments');

module.exports = mongoose.model('Comment',CommentSchema);