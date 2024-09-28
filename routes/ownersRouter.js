const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');
const productModel = require("../models/product-model")

// Conditional route handling
if (process.env.NODE_ENV === 'development') {
    router.post("/create",async (req, res) => {
        let owner = await ownerModel.find();
        if(owner.length > 0) {
            res.status(400).send("You have already created an owner account. Please login to continue.");
        }else{
            const {name,email,password} = req.body;

            let createOwner = await ownerModel.create({
                fullname,
                email,
                password
            });;

            res.status(201).send(createOwner);
        }
    });
}

router.get("/deleteAll",async (req,res)=>{
    let deletall = productModel.delete()
    res.redirect("/owners/admin")
})
// Route for base path "/owners"
router.get("/admin", async (req, res) => {
    let products = await productModel.find()
    console.log(products)
    res.render("admin",{products});
});

router.get("/createproducts", async (req, res) => {
    let sucess = req.flash("sucess")
    res.render("createproducts",{sucess});
});


module.exports = router;
