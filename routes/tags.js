const express = require('express');
const router = express.Router();
const TagsCtrl = require('../controllers/tags.ctrl');

router.route('/').get(
    async(req,res)=>{
        try{
            const tags = await TagsCtrl.getAll(req);
            res.json({
                success:true,
                data:tags,
                message:"Tags generated"
            });
        }catch (e) {
            res.json({
                success:false,
                data:null,
                message:e.message
            });
        }
    }
).post(
    async(req,res)=>{
        try{
            const tag = await TagsCtrl.add({
                orgId:req.body.orgId,
                content:req.body.content
            });
            res.json({
                success:true,
                data:tag,
                message:"Tag created"
            });
        }catch (e) {
            res.json({
                success:false,
                data:null,
                message:e.message
            });
        }
    }
);
router.route("/:id").delete(
    async(req,res)=>{
        try{
            const tag = await TagsCtrl.delete(req.params.id);
            res.json({
                success:true,
                data:tag,
                message:"Tag deleted"
            });
        }catch (e) {
            res.json({
                success:false,
                data:null,
                message:e.message
            });
        }
    }
).get(
    async(req,res)=>{
        try{
            const tag = await TagsCtrl.getById(req.params.id);
            res.json({
                success:true,
                data:tag,
                message:"Tag getted"
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
    async(req,res)=>{
        try{
            const tag = await TagsCtrl.removeTagFromOrg(req.params.id, req.query.orgId);
            res.json({
                success:true,
                data:tag,
                message:"Tag removed from organization"
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