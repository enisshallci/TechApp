const express = require("express")
const router = express.Router()
const getProducts = require("../controllers/productController")


router.get("/", getProducts)        //  / sepse ska ma ma anej qka me shtu, bohet handle nga getProducts method nga controlleri, dhe controlleri
                                    // i krijon database queries.

module.exports = getProducts