const Product = require("../models/ProductModel")

const getProducts = (req, res) => {
    res.send("Produktett tona")
}

module.exports = getProducts