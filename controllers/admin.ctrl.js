const UserActions = require('../models/user-actions');

class AdminCtrl{
    static async getAllUserActions(req){
        const options = {};
        if(req.query.uaType){
            options.uaType = req.query.uaType;
        }
        return UserActions.find(options);
    }
    static async addUserAction(data){
        const {userId} = data;
        const userAction = new UserActions({
            userId
        });
        return userAction.save();
    }
    static async getByIdUserActions(id){
        if(await UserActions.findById(id)){
            return UserActions.findById(id);
        }
        throw new Error('User Action is not exists');
    }
    static async updateUserAction(id,comment){
        if(await UserActions.findById(id)){
            const ua = await UserActions.findById(id);
            ua.comment = comment;
            return ua.save();
        }
        throw new Error('User Action is not exists');
    }
}

module.exports = AdminCtrl;