const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title:{
        type:String,
        min:8,
        max:100,
        required:true
    },
    description:{
        type:String,
        min:2,
        max:100000000,
        required:true
    },
    image:{
        type:String,
        //required:true
    }
},{timestamps:true, versionKey:false});

PostSchema.set('collection','posts');

module.exports = mongoose.model('Post',PostSchema);