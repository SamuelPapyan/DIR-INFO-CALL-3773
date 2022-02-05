const Category = require('../models/categories');

class CategoryCtrl{
    static async getOne(name){
        if(await Category.findOne({name:name})){
            return await Category.findOne({name:name});
        }
        throw new Error('Category is not exists');
    }
}

module.exports = CategoryCtrl