const express = require('express');
const router = express.Router();
const TokenManager = require('../managers/token-manager');
const AuthCtrl = require('../controllers/auth.ctrl');
const upload = require('../middlewares/upload');

router.route('/login').post(
    async(req,res)=>{
    try{
        const token = await AuthCtrl.login({
            ...req.body
        })
        res.json({
            success:true,
            data:token,
            message:"Good luck"
        })
    }
    catch(e) {
        res.json({
            success:false,
            data:null,
            message:e.message
        })
    }

});

router.route('/register').post(async(req,res)=> {
    try {
        let userdata = await AuthCtrl.register({
            username: req.body.username,
            name: req.body.name,
            email:req.body.email,
            password: req.body.password
        });
        userdata = userdata.toObject();
        delete userdata.password;
        res.json({
            success: true,
            data: userdata,
            message: "user created"
        });
    } catch (e) {
        res.json({
            success: false,
            data: null,
            message: e.message
        });
    }
});

router.route('/activate').get(
    async(req,res)=>{
        try{
            await AuthCtrl.activate(req.query.code);
            res.json({
                success:true,
                data:{},
                message:"Good luck"
            })
        }
        catch(e) {
            res.json({
                success:false,
                data:null,
                message:e.message
            })
        }

    });


module.exports = router;