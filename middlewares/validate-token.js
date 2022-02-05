const TokenManager = require('../managers/token-manager');

module.exports = async(req, res, next) =>{
    const token = req.headers['token'] || req.query.token || req.body.token;
    if(token) {
        try{
            const decoded = await TokenManager.decode(token);
            if(decoded.userId){
                req.decoded = decoded;
                next();
            }
            else{
                res.json({
                    message:"Auth error"
                });
            }
        }
        catch(e){
            res.json({
                message: `Token not provided: ${e.message}`
            });
        }
    }else {
        res.json({
            message: "Token not provided"
        });
    }
}