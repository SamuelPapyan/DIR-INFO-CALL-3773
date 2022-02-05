const Comment = require('../models/comments');
const Organization = require('../models/organizations');
const User = require('../models/users');

class CommentsCtrl{
    static async getAll(orgId){
        if(await Organization.findById(orgId)){
            return Comment.find({organizationId:orgId}).populate('author','-password');
        }
        throw new Error("Organization not found");
    }
    static async add(data){
        const {userId, content, orgId} = data;
        if(!orgId){
            throw new Error("Organization not found");
        }
        if(!(await User.findById(userId))){
            throw new Error("User not found");
        }
        const comment = new Comment({
            author:userId,
            content:content,
            organizationId:orgId
        });
        await comment.save();
        const myId = comment._id;
        return Comment.findById(myId).populate('author');
    }
    static async update(id,data){
        if(!(await Comment.findById(id))){
            throw new Error("Comment not found");
        }
        const comment = await Comment.findById(id);
        comment.content = data.content;
        return comment.save();
    }
    static async delete(id){
        if(!(await Comment.findById(id))){
            throw new Error("Comment not found");
        }
        return Comment.findByIdAndDelete(id);;
    }
}

module.exports = CommentsCtrl;