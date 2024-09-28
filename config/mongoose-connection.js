const mongoose = require('mongoose');
const dbgr = require("debug")("development:mongoose");
const config = require('config');

mongoose
.connect(`${config.get("MONGO_URI")}/scatch`)
.then(() =>{
        dbgr('Connected to MongoDB')
        // console.log('DEBUG:', process.env.DEBUG);
        //$env:DEBUG="development:*"
    })
.catch((err) =>{
        dbgr('MongoDB connection error:', err)
    });

module.exports = mongoose.connection;