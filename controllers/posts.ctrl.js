const Post = require('../models/posts');
const path = require('path');
const fs = require('fs').promises;

class PostsCtrl{
    static async getAll(req){
        const options = {};
        if(req.query.search){
            options.$or = [];
            options.$or.push({title: new RegExp(req.query.search,"i")});
            options.$or.push({description: new RegExp(req.query.search,"i")});
        }
        return Post.find(options);
    }
    static async getById(id){
        if(await Post.findById(id)){
            return Post.findById(id);
        }
        throw new Error("Post not found");
    }
    static async add(data){
        const post = new Post({
            title:data.title,
            description:data.description,
            image:data.image ? data.image.filename : "NO_IMAGE.jpg"
        });
        return post.save();
    }
    static async update(id,data){
        if(!(await Post.findById(id))){
            throw new Error("Post not found");
        }
        const post = await Post.findById(id);
        if(data.image){
            if(post.image != "NO_IMAGE.jpg"){
                await fs.unlink(path.join(__homedir,"uploads/",post.image));
            }
            post.image = data.image.filename;
        }
        post.title = data.title;
        post.description = data.description;
        return post.save();
    }
    static async delete(id){
        if(!(await Post.findById(id))){
            throw new Error("Post not found");
        }
        const post = await Post.findById(id);
        await Post.findByIdAndDelete(id);
        if(post.image != "NO_IMAGE.jpg"){
            fs.unlink(path.join(__homedir,"uploads/",post.image));
        }
        return post;
    }
}

module.exports = PostsCtrl;