const express = require('express');
const router = express.Router();
const LocaleCtrl = require('../controllers/locale.ctrl');

router.get('/',
    async(req,res)=>{
        try{
            const words = await LocaleCtrl.getOne();
            res.json({
                success:true,
                data:words,
                message:"Generated Localization Data"
            });
        }catch (e) {
            res.json({
                success:false,
                data:null,
                message:e.message
            });
        }
    });
router.put('/:lang',
    async(req,res)=>{
        try{
            const words = await LocaleCtrl.update(req.params.lang);
            res.json({
                success:true,
                data:words,
                message:"Localization language is switched"
            });
        }catch (e) {
            res.json({
                success:false,
                data:null,
                message:e.message
            });
        }
    });
module.exports = router;