const express = require('express');
const router = express.Router();
const TranslateCtrl = require('../controllers/translate.ctrl');

router.route('/').get(async(req,res)=>{
    try{
        const text = req.query.text;
        const lang = req.query.lang;
        const data = await TranslateCtrl.translateText(text,lang);
        res.json({
            success:true,
            data:data,
            message:"Text is translated"
        })
    }
    catch(e){
        res.json({
            success:false,
            data:null,
            message:e.message
        });
    }
}).post(async(req,res)=>{
    try{
        const texts = req.body.texts;
        const textArray = texts.split('|-|');
        const lang = req.body.lang;
        const data = await TranslateCtrl.translateTexts(textArray,lang);
        res.json({
            success:true,
            data:data,
            message:"Texts are translated"
        })
    }
    catch(e){
        res.json({
            success:false,
            data:null,
            message:e.message
        });
    }
});

module.exports = router;