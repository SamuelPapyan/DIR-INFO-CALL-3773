const express = require('express');
const router  = express.Router();
const AdminCtrl = require('../controllers/admin.ctrl');

router.route('/').get(
    async(req,res)=>{
        try{
            const users = await AdminCtrl.getAllUserActions(req);
            res.json({
                success:true,
                data:users,
                message:"User Actions are generated"
            })
        }catch (e) {
            res.json({
                success:false,
                data:null,
                message:e.message
            })
        }
    }
);

router.route('/:id').get(
    async(req,res)=>{
        try{
            const userAction = await AdminCtrl.getByIdUserActions(req.params.id);
            res.json({
                success:true,
                data:userAction,
                message:"User action is generated"
            })
        }catch (e) {
            res.json({
                success:false,
                data:null,
                message:e.message
            })
        }
    }
).put(
    async(req,res)=>{
        try{
            const updatedUA = await AdminCtrl.updateUserAction(req.params.id, req.body.comment);
            res.json({
                success:true,
                data:updatedUA,
                message:"User action is updated"
            })
        }
        catch(e){
            res.json({
                success:false,
                data:null,
                message:e.message
            })
        }
    }
)

module.exports = router;