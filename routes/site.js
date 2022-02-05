const express = require('express');
const router = express.Router();
const SiteCtrl = require('../controllers/site.ctrl');

router.route('/sendmail').post(
    async(req,res)=>{
        try{
            const send = await SiteCtrl.sendMail(req.body);
            res.json({
                success:true,
                data:send,
                message:"Message Sended"
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

router.route('/code').get(
    async(req,res)=>{
        try{
            const searchResult = await SiteCtrl.searchCodeOrCountry(req.query.search);
            res.json({
                success:true,
                data:searchResult,
                message:"Search Results getted"
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