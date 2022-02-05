const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const OrganizationCtrl = require('../controllers/organizations.ctrl');


router.route('/').get(
    async(req,res)=>{
        try{
            const data = await OrganizationCtrl.getAll(req);
            res.json({
                success:true,
                data:data,
                message:"Organizations generated"
            });
        }catch(e){
            res.json({
                success:false,
                data:null,
                message:e.message
            });
        }
    }
).post(
    upload.single('image'),
    async(req,res)=>{
        try{
            const data = await OrganizationCtrl.add({
                name:req.body.name,
                logo:req.file,
                address:req.body.address,
                phones:req.body.phones.split(","),
                email:req.body.email,
                websiteUrl:req.body.websiteUrl,
                director:req.body.director,
                employees:req.body.employees,
                foundationYear:req.body.foundationYear,
                workingDays:req.body.workingDays.split(","),
                workingStartTime:req.body.startTime,
                workingEndTime:req.body.endTime,
                description:req.body.description,
                fax:req.body.fax,
                facebookUrl:req.body.facebookUrl,
                twitterUrl:req.body.twitterUrl,
                instagramUrl:req.body.instagramUrl,
                gallery:req.body.gallery,
                photos:req.body.photos.split(","),
                videoLink:req.body.videoLink,
                map:req.body.map,
                more:req.body.more,
                category:req.body.category,
                subcategory:req.body.subcategory,
                shortLink:req.body.shortLink,
                price:req.body.price,
                hasLink:req.body.hasLink
            });
            res.json({
                success:true,
                data:data,
                message:"Organization created"
            });
        }catch(e){
            res.json({
                success:false,
                data:null,
                message:e.message
            });
        }
    }
);

router.route('/:id').get(
  async(req,res)=>{
      try{
          const data = await OrganizationCtrl.getById(req.params.id);
          res.json({
              success:true,
              data:data,
              message:"Organizations getted"
          });
      }catch(e){
          res.json({
              success:false,
              data:null,
              message:e.message
          });
      }
  }
).put(
    upload.single('image'),
    async(req,res)=>{
        try{
            const data = await OrganizationCtrl.update(req.params.id,{
                name:req.body.name,
                logo:req.file,
                phones:req.body.phones.split(","),
                address:req.body.address,
                email:req.body.email,
                websiteUrl:req.body.websiteUrl,
                director:req.body.director,
                employees:req.body.employees,
                foundationYear:req.body.foundationYear,
                workingDays:req.body.workingDays.split(","),
                photos:req.body.photos.split(","),
                videoLink:req.body.videoLink,
                workingStartTime:req.body.startTime,
                workingEndTime:req.body.endTime,
                description:req.body.description,
                tags:req.body.tags,
                fax:req.body.fax,
                facebookUrl:req.body.facebookUrl,
                twitterUrl:req.body.twitterUrl,
                instagramUrl:req.body.instagramUrl,
                gallery:req.body.gallery,
                map:req.body.map,
                more:req.body.more,
                category:req.body.category,
                subcategory:req.body.subcategory,
                shortLink:req.body.shortLink,
                price:req.body.price,
                hasLink:req.body.hasLink
            });
            res.json({
                success:true,
                data:data,
                message:"Organizations updated"
            });
        }catch(e){
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
            const data = await OrganizationCtrl.delete(req.params.id);
            res.json({
                success:true,
                data:data,
                message:"Organizations deleted"
            });
        }catch(e){
            res.json({
                success:false,
                data:null,
                message:e.message
            });
        }
    }
);

module.exports = router;