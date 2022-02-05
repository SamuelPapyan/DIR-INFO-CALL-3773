const multer = require('multer');
const mimeType = require('mime-types');

const storage = multer.diskStorage({
   destination:function(req,file,cb){
       cb(null,'uploads/');
   },
    filename:function (req,file,cb){
       const myFilename = `${Date.now()}_${Date.now() + 10}_picto.${mimeType.extension(file.mimetype)}`;
       cb(null,`${myFilename}`);
    }
});

module.exports = multer({storage:storage});