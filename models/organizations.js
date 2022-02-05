const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    logo:String,
    address:String,
    phones:[{type:String}],
    email:{
        type:String
    },
    websiteUrl:String,
    director:String,
    employees:String,
    foundationYear:String,
    workingDays:[{type:String}],
    workingStartTime:String,
    workingEndTime:String,
    description:String,
    tags:[{type:Schema.Types.ObjectId, ref:'Tag'}],
    comments:[{type:Schema.Types.ObjectId, ref:'Comment'}],
    fax:String,
    facebookUrl:String,
    twitterUrl:String,
    instagramUrl:String,
    gallery:String,
    map:String,
    more:String,
    category:String,
    subcategory:String,
    photos:[{type:String}],
    videoLink:String,
    shortLink:String,
    price:{type:String,default:"45000"},
    hasLink:Boolean
},{versionKey:false, timestamps:true});

OrganizationSchema.set('collection','organizations');
module.exports = mongoose.model('Organization',OrganizationSchema);