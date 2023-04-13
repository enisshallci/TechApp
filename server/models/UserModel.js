const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true        //Nuk ka "Usera" me email të njejte. Imella eshte unike per secilin
    },
    phoneNumber: {
        type: String
    },
    address: {
        type: String
    },
    country: {
        type: String
    },
    zipCode: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false          //Nuk lejohet me qenë admin nje user i thjesht, per kete arsye by default eshte false
    }
}, {
    timestamps: true            
});

const User = mongoose.model("User", userSchema);
module.exports = User;