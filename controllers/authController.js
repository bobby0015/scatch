const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');
const dbgr = require("debug")("development:userRouter");

// Controller for handling user authentication
module.exports.registerUser = (req, res) => {
    try {
        // Extract data from request body
        let { fullname, email, password } = req.body;
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                dbgr(err.message);
            } else {
                bcrypt.hash(password, salt, async (err, hash) => {
                    if (err) {
                        dbgr(err.message);
                    } else {
                        // Check if user already exists in the database before creating a new one
                        let user = await userModel.findOne({ email });
                        dbgr(user)
                        if (user) {
                            req.flash("error", "This user already Exist");
                            dbgr("User already exists");
                            res.redirect("/");
                        } else {
                            let newUser = await userModel.create({
                                fullname,
                                email,
                                password: hash
                            })
                            let token = generateToken(newUser);
                            res.cookie("log_token", token);
                            req.flash("sucess", "Account has Been Created Successfully")
                            dbgr("User registered successfully", newUser);
                            res.redirect("/")
                        }
                    }
                });
            }
        });

    } catch (err) {
        dbgr("Error:", err.message);
        res.status(500).send("Internal Server Error");
    }
}

module.exports.loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (!user) {
            req.flash("error", "Check the Email Once Again");
            res.redirect("/")
        } else {
            bcrypt.compare(password, user.password, (err, password_matched) => {
                if (err) {
                    req.flash("error", "Something Went Wrong....Try Again");
                    res.redirect("/")
                } else {
                    if (password_matched) {
                        let token = generateToken(user);
                        res.cookie("log_token", token);
                        res.redirect("/shop")
                    } else {
                        req.flash("error", "Check the Password Once Again ");
                        res.redirect("/")
                    }
                }
            });
        }
    } catch (err) {
        dbgr("Error:", err.message);
        res.status(500).send("Internal Server Error");
    }
}

module.exports.logout = async(req,res) =>{
    res.cookie("log_token","");
    res.redirect("/")
}