const mongoose = require('mongoose');
require('dotenv').config();
const connectionString = process.env.connectionString;

module.exports = (req,res,next) => {
    mongoose.connect(connectionString, {useNewUrlParser:true,useUnifiedTopology:true})
    .then((con) => {
        console.log("connected");
        next();
    })
    .catch((conerr) => {
        res.status(500).json("connection err");
    });
}