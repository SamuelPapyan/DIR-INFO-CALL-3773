const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    email:{
        type:String,
        //required:true
        //unique:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    dateOfEnter:Date,
    friends:[{type:Schema.Types.ObjectId, ref:"User"}],
    friendRequests:[{type:Schema.Types.ObjectId, ref:"User"}],
    sentFriendRequests:[{type:Schema.Types.ObjectId, ref:"User"}]
},{versionKey:false, timestamps:true});
UserSchema.set('collection','users');

module.exports = mongoose.model('User',UserSchema);