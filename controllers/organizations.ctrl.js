const Organization = require('../models/organizations');
const Tag = require('../models/tags');
const fs = require('fs').promises;
const path = require('path');

class OrganizationsCtrl{
    static async getAll(req){
        const options = {};
        if(req.query.search){
            options.$or = [];
            options.$or.push({name:{$regex:new RegExp(req.query.search), $options : "i"}});
            options.$or.push({description:{$regex:new RegExp(req.query.search), $options : "i"}});
        }
        if(req.query.category){
            options.category = req.query.category;
        }
        if(req.query.subcategory){
            console.log(req.query.subcategory);
            options.subcategory = req.query.subcategory;
        }
        return Organization.find(options).sort({name:1}).populate('tags');
    }
    static async getById(id){
        if(await Organization.findById(id)){
            return Organization.findById(id);
        }
        throw new Error("Organization not found");
    }
    static async add(data){
        const organization = new Organization({
            name:data.name,
            logo:data.logo ? data.logo.filename : "NO_IMAGE.jpg",
            address:data.address,
            phones:data.phones,
            email:data.email,
            websiteUrl:data.websiteUrl,
            director:data.director,
            employees:data.employees,
            foundationYear:data.foundationYear,
            workingDays:data.workingDays,
            workingStartTime:data.workingStartTime,
            workingEndTime:data.workingEndTime,
            description:data.description,
            fax:data.fax,
            facebookUrl:data.facebookUrl,
            twitterUrl:data.twitterUrl,
            photos:data.photos,
            videoLink:data.videoLink,
            instagramUrl:data.instagramUrl,
            gallery:data.gallery,
            map:data.map,
            more:data.more,
            category:data.category,
            shortLink:data.shortLink,
            subcategory:data.subcategory,
            price:data.price,
            hasLink:data.hasLink
        });
        return organization.save();
    }
    static async update(id,data){
        if(await Organization.findById(id)){
            const organization = await Organization.findById(id);
            if(data.logo){
                if(organization.logo != "NO_IMAGE.jpg"){
                    await fs.unlink(path.join(__homedir,'uploads/',organization.logo));
                }
                organization.logo = data.logo.filename;
            }
            organization.name = data.name;
            organization.address = data.address;
            organization.phones = data.phones;
            organization.email = data.email;
            organization.websiteUrl = data.websiteUrl;
            organization.director = data.director;
            organization.employees = data.employees;
            organization.foundationYear = data.foundationYear;
            organization.workingDays = data.workingDays;
            organization.workingStartTime = data.workingStartTime;
            organization.workingEndTime = data.workingEndTime,
            organization.description = data.description;
            organization.tags = data.tags;
            organization.photos = data.photos;
            organization.video = data.video;
            organization.fax = data.fax;
            organization.facebookUrl = data.facebookUrl;
            organization.twitterUrl = data.twitterUrl;
            organization.instagramUrl = data.instagramUrl;
            organization.gallery = data.gallery;
            organization.map = data.map;
            organization.more = data.more;
            organization.category = data.category;
            organization.price = data.price;
            organization.subcategory = data.subcategory;
            organization.shortLink = data.shortLink;
            organization.hasLink = data.hasLink;
            return organization.save();
        }
    }
    static async delete(id){
        if(await Organization.findById(id)){
            const organization = await Organization.findById(id);
            if(organization.logo != "NO_IMAGE.jpg"){
                await fs.unlink(path.join(__homedir,'uploads/',organization.logo));
            }
            if(organization.tags.length > 0){
                organization.tags.forEach(async(tagId)=>{
                    const tag = await Tag.findById(tagId);
                    if(tag.organizations.includes(organization._id)){
                        tag.organizations.pull(organization._id);
                    }
                    await tag.save();
                });
            }
            return Organization.findByIdAndDelete(id);
        }
        throw new Error("Organization not found");
    }
}

module.exports = OrganizationsCtrl;