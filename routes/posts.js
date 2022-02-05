const express = require('express');
const router = express.Router();
const PostsCtrl = require('../controllers/posts.ctrl');
const upload = require('../middlewares/upload');

router.route('/').get(async(req,res)=>{
    try{
        const posts = await PostsCtrl.getAll(req);
        res.json({
            success:true,
            data:posts,
            message:"Post Getted"
        });
    }
    catch(e){
        res.json({
            success:false,
            data:null,
            message:e.message
        });
    }
}).post(
    upload.single('image'),
    async(req,res)=>{
    try{
        const post = await PostsCtrl.add({
            title:req.body.title,
            description:req.body.description,
            image:req.file
        });
        res.json({
            success:true,
            data:post,
            message:"Post Created"
        });
    }
    catch(e){
        res.json({
            success:false,
            data:null,
            message:e.message
        });
    }
});

router.route('/:id').get(
    async(req,res)=>{
        try{
            const post = await PostsCtrl.getById(req.params.id);
            res.json({
                success:true,
                data:post,
                message:"Post Goten"
            });
        }catch (e) {
            res.json({
                success:false,
                data:null,
                message:e.message
            });
        }
    }
).put(
    upload.single('image'),
    async(req,res)=>{
        try {
            const post = await PostsCtrl.update(req.params.id,{
                title:req.body.title,
                image:req.file,
                description:req.body.description
            });
            res.json({
                success:true,
                data:post,
                message:"Post Updated"
            });
        }
        catch (e) {
            res.json({
                success:false,
                data:null,
                message:e.message
            });
        }
    }
).delete(
    async(req,res)=>{
        try{
            const deletedPost = await PostsCtrl.delete(req.params.id);
            res.json({
                success:true,
                data:deletedPost,
                message:"Post Deleted"
            });
        }catch (e) {
            res.json({
                success:false,
                data:null,
                message:e.message
            });
        }
    }
)

module.exports = router;