const express = require('express');
const router = express.Router();
const validateToken = require('../middlewares/validate-token');
const CommentsCtrl = require('../controllers/comments.ctrl');

router.route('/').get(
    async(req,res)=>{
        try{
            const comments = await CommentsCtrl.getAll(req.query.orgId);
            res.json({
                success:true,
                data:comments,
                message:"Comments are getted"
            });
        }
        catch(e){
            res.json({
                success:false,
                data:null,
                message:e.message
            });
        }
    }
).post(
    validateToken,
    async(req,res)=>{
        try{
            const comment = await CommentsCtrl.add({
                userId:req.decoded.userId,
                content:req.body.content,
                orgId:req.query.orgId
            });
            res.json({
                success:true,
                data:comment,
                message:"Comment created"
            });
        }
        catch(e){
            res.json({
                success:false,
                data:null,
                message:e.message
            });
        }
    }
)

router.route('/:id').put(
    async(req,res)=>{
        try{
            const comment = await CommentsCtrl.update(req.params.id,{
                content:req.body.content
            });
            res.json({
                success:true,
                data:comment,
                message:"Comment updated"
            });
        }
        catch(e){
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
            const comment = await CommentsCtrl.delete(req.params.id);
            res.json({
                success:true,
                data:comment,
                message:"Comment deleted"
            });
        }
        catch(e){
            res.json({
                success:false,
                data:null,
                message:e.message
            });
        }
    }
)

module.exports = router;