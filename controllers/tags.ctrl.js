const Tag = require('../models/tags');
const Organization = require('../models/organizations');

class TagsCtrl{
    static async getAll(req){
        const options = {};

        return Tag.find({});
    }
    static async getById(id){
        if(await Tag.findById(id)){
            return Tag.findById(id);
        }
        throw new Error("Tag not found");
    }
    static async add(data){
        let tag = await Tag.findOne({content:data.content});
        if(!tag){
            tag = new Tag({
                content:data.content
            });
        }
        const organization = await Organization.findById(data.orgId);
        if(!organization.tags.includes(tag._id)){
            organization.tags.push(tag._id);
        }
        else{
            throw new Error("Tag is exists for this organization.");
        }
        await tag.save();
        if(!tag.organizations.includes(data.orgId)) {
            tag.organizations.push(data.orgId);
        }
        await organization.save();
        return tag;
    }
    static async delete(id){
        if(!(await Tag.findById(id))){
            throw new Error("Tag not found");
        }
        return Tag.findByIdAndDelete(id);
    }
    static async removeTagFromOrg(id, orgId){
        if(!orgId){
            throw new Error("Organization not detected.");
        }
        if(!(await Tag.findById(id))){
            throw new Error("Tag not found");
        }
        if(!(await Organization.findById(orgId))) {
            throw new Error("Organization not found");
        }
        const tag = await Tag.findById(id);
        const organization = await Organization.findById(orgId);
        tag.organizations.pull(orgId);
        organization.tags.pull(id);
        await organization.save();
        return tag.save();
    }
}

module.exports = TagsCtrl;