const express = require('express');
const router = express.Router();
const isloggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");

// Route for base path "/"
router.get('/', (req, res) => {
    if(!req.cookies.log_token){  
    let error = req.flash("error");
    let sucess = req.flash("sucess")
    res.render("index", { error, sucess });
    }else{
        res.redirect("/shop")
    }

});

// Route for "/shop" with authentication check
router.get("/shop", isloggedIn, async (req, res) => {
    try {
        const products = await productModel.find();
        res.render("shop", { products });
    } catch (err) {
        console.error("Error fetching products:", err);
        req.flash("error", "Could not load products. Please try again later.");
        res.redirect("/"); // Redirect or handle error appropriately
    }
});

module.exports = router;
