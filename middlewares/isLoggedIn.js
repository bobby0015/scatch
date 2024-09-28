const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports = async(req,res,next)=>{
    if(!req.cookies.log_token){
        req.flash("error","You are not logged in");
        res.redirect("/");
    }else{
        try{
            let decoded = jwt.verify(req.cookies.log_token,process.env.JWT_KEY)
            let user = await userModel
            .findOne({email:decoded.email})
            .select("-password");
            req.user = user;
            return next();
        }catch(err){
            req.flash("error","Something went Wrong")
            res.redirect("/");
        }
    }
}
