import connectDB from "../config/MongooseConnection.js";
import app from "../index.js";
import { configDotenv } from "dotenv"

configDotenv();

const PORT = process.env.PORT || 3008;

(function(){
    connectDB();
    app.listen(PORT, ()=>{
        console.log(`Server Started at ${PORT}`);
    })
})()