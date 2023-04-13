const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: "Default Category Description"
    },
    image: {
        type: String,
        //default ...
    },
    attributes: [
        {key: {type: String}, value: [{type: String}]}
    ]
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;