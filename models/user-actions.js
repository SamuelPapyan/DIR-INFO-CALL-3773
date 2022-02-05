const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserActionSchema = new Schema({
    username:String,
    name:String,
    dateOfEnter:Date,
    dateOfSignup:Date,
    uaType:String,
    comment:{type:String,default:''}
},{timestamps:true,versionKey:false});

UserActionSchema.set('collection','user_actions');

module.exports = mongoose.model('UserAction',UserActionSchema);