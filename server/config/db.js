require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = async() => {
    try {

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log("Konektimi me MongoDB ka arritur me sukses!");
    } catch(error) {
        console.log("Konektimi me MongoDB nuk ka arritur");
        process.exit(1);
    }
}

module.exports = connectDB;