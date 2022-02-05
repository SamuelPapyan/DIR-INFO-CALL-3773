const User = require('../models/users');
const Bcrypt = require('../managers/bcrypt');
const UserActions = require('../models/user-actions');
const path = require('path');
const fs = require('fs');

class UsersCtrl{
    static async getById(id){
        if(!(await User.findById(id))){
            throw new Error('username not exists');
        }
        return User.findById(id);
    }
    static async getAll(data){
        const options = {
            $and: []
        };
        options.$and.push({_id:{$ne: data.userId}});
        const limit = {};
        if(data.name){
            options.$and.push({name: new RegExp(data.name, 'i')});
        }
        if(data.limit){
            limit.limit = Number(data.limit);
        }
        return User.find(options,null,limit);

    }
    static async superGetAll(){
        return User.find();
    }
    static async add(data){
        if(await User.findOne({username:data.username})){
            throw new Error("username is exists");
        }
        const user = new User({
            username:data.username,
            name:data.name,
            email:data.email,
            password:await Bcrypt.hash(data.password)
        });
        await user.save();
        const ua = new UserActions({
            username:user.username,
            name:user.name,
            dateOfSignUp:user.createdAt,
            uaType:"signup"
        });
        await ua.save();
        return user;
    }
    static async update(data){
        const {userId, name, email} = data;
        const user = await User.findById(userId);
        console.log(data);
        if(!user){
            throw new Error("user not exists");
        }
        user.email = email;
        user.name = name;
        return user.save();
    }

    static async delete(req,res){
        if(!(await User.findById(req.params.id))){
            throw new Error("username not exists");
        }
        await User.findByIdAndDelete(req.params.id);
    }
}

module.exports = UsersCtrl;