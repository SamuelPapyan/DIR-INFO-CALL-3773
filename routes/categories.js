const express = require('express');
const router = express.Router();
const CategoryCtrl = require('../controllers/category.ctrl');

router.route('/:name').get(
    async(req,res)=>{
        try{
            console.log(req.params.name);
            const category = await CategoryCtrl.getOne(req.params.name);
            res.json({
                success:true,
                data:category,
                message:"Category is getted"
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

module.exports = router;