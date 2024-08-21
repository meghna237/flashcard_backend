const mongoose = require('mongoose');
require('dotenv').config();

async function dbConnection() {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB Connected..");
    } catch (err) {
        console.log(err);
    }
}

module.exports = { dbConnection };