
const mongoose = require("mongoose");
const dotenv = require ("dotenv");

dotenv.config({path: "./config/.env"})

const connectDB = async () =>{
    try {
        mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser : true,
            useUnifiedTopology : true,
            useCreateIndex : true
        })
        console.log("mongo db connected")
        
    } catch (error) {
        console.log("error mongoDB", error)
        
    }
}

module.exports = connectDB;

