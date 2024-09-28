const express = require('express');
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model")

// Route for base path "/products"
router.post("/create", upload.single("image"), async (req, res) => {
    try {
        let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

        const product = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor
        })

        req.flash("sucess", "Product has been Created Successfully")
        res.redirect("/owners/createproducts")
    } catch (err) {
        res.status(501).send("Somethig Went Wrong");
    }
});


module.exports = router;
