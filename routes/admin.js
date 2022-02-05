const express = require('express');
const router  = express.Router();
const AdminCtrl = require('../controllers/admin.ctrl');

router.route('/user_actions').get(
    async(req,res)=>{
        try{
            const users = await AdminCtrl.getAllUserActions();
            res.json({
                success:true,
                data:users,
                message:"Users are generated"
            })
        }catch (e) {
            res.json({
                success:false,
                data:null,
                message:e.message
            })
        }
    });

module.exports = router;