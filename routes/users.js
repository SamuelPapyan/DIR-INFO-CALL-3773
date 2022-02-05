const express = require('express');
const router = express.Router();
const path = require('path');
const upload = require(path.join(__homedir,'./middlewares/upload'));
const UsersCtrl = require('../controllers/users.ctrl');
const validateToken = require('../middlewares/validate-token');
const { body, validationResult } = require('express-validator');
const User = require('../models/users');

router.route('/').get(
    validateToken,
    async(req,res)=>{
    try{
        const users = await UsersCtrl.getAll({
            name: req.query.name,
            userId: req.decoded.userId
        });
        res.json({
            success:"Good luck",
            data:users
        });
    }
    catch(e) {
        res.json({
            success:false,
            data:null,
            message:e.message
        })
    }
}).post(upload.single('file'),async(req,res)=>{
    try{
        let userdata = await UsersCtrl.add({
            username:req.body.username,
            name:req.body.name,
            file:req.file,
            password:req.body.password
        });
        userdata = userdata.toObject();
        delete userdata.password;
        res.json({
            success:true,
            data:userdata,
            message:"user created"
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

router.route('/current').post(
    validateToken,
    async(req,res)=>{
        try{
            const user = await UsersCtrl.getById(req.decoded.userId);
            if(!user){
                throw new Error("Im sorry, i can't  get currrent user data");
            }
            res.json({
                success:true,
                data:user,
                message:"Good luck"
            })
        }catch(e){
            res.json({
               success:false,
               data:null,
               message:e.message
            });
        }
}).put(
    upload.single('image'),
    validateToken,
    async(req,res)=>{
        const updatedData = await UsersCtrl.update({
            name:req.body.name,
            email:req.body.email,
            image:req.file,
            userId:req.decoded.userId
        })
        try{
            res.json({
                success:true,
                data:updatedData,
                message:"Good luck"
            })
        }
        catch(e){
            res.json({
                success:false,
                data:null,
                message:e.message
            });
        }
    }
);

router.route('/:id').get(async(req,res)=>{
    try{
        const user = await UsersCtrl.getById(req.params.id);
        res.json({
            success:true,
            data:user,
            message:"user was found"
        });
    }
    catch(e){
        res.json({
            success:false,
            data:null,
            message:e.message
        });
    }
}).delete(async(req,res)=>{
    try{
        await UsersCtrl.delete(req,res);
        res.json({
            success:true,
            message:"user deleted"
        });
    }
    catch(e){
        res.json({
            success:false,
            data:null,
            message:e.message
        });
    }
}).put(upload.single('file'),async(req,res)=>{
    try{
        const userdata = await UsersCtrl.update(req,{
            username:req.body.username,
            name:req.body.name,
            file:req.file.filename
        });
        res.json({
            success:true,
            data:userdata,
            message:"user updated"
        })
    }
    catch(e){
        res.json({
            success:false,
            data:null,
            message:e.message
        })
    }
});

module.exports = router;