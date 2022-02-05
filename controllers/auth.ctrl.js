const User = require('../models/users');
const Bcrypt = require('../managers/bcrypt');
const TokenManager = require('../managers/token-manager');
const UsersCtrl = require('./users.ctrl');
const UserAction = require('../models/user-actions');
const email = require('../managers/email-manager');

class AuthCtrl{
    static async login(data){
        const {username, password} = data;
        const user = await User.findOne({username});
        if(!user){
            throw new Error('username or password is wrong');
        }

        if(await Bcrypt.compare(password, user.password)){

            if(!user.isActive){
                throw new Error("User profile is not active");
            }
            user.dateOfEnter = new Date();
            await user.save();
            const ua = new UserAction({
                username:user.username,
                name:user.name,
                dateOfEnter:user.dateOfEnter,
                uaType:"login"
            });
            await ua.save();
            return TokenManager.encode({
                userId: user._id
            });
        }
        throw new Error('username or password is wrong');
    }


    static async register(data){
        const user = await UsersCtrl.add(data);
        /*
        const token = TokenManager.encode({
            email:user.email
        }, 3600);
        await email(user.email, "Node JS register", `<a href="http://localhost:63342/samvel_papyan/views/activate.html?activation-code=${token}&_ijt=7bjd8b9g0tfdhd2u951cstip4i">Activate profile</a>`);
        */
        return user;
    }

    static async activate(token){
        const decoded = await TokenManager.decode(token);
        if(decoded.email){
            const user = await User.findOne({email:decoded.email});
            if(!user || user.isActive){
                throw new Error("Invalid code");
            }
            user.isActive = true;
            return user.save();
        }
        throw new Error('Invalid code (decoded)');
    }
}

module.exports = AuthCtrl;