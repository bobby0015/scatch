const express = require('express');
const router = express.Router();
const dbgr = require("debug")("development:userRouter");
const {registerUser,loginUser,logout} = require('../controllers/authController');


// Route for base path "/users"
router.get("/", (req, res) => {
    dbgr("User Route is Working");  // Debugging log for this route.
    res.send('Hello, World! This is the API endpoint for your web application.');
});

// Route for POST request to "/users/Register" to register a new user.
router.post("/register",registerUser)

router.post("/login",loginUser)
router.get("/logout",logout)


module.exports = router;