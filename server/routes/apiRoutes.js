const express = require('express')
const router = express.Router()

const productRoutes = require("./productRoutes.js")
const orderRoutes = require("./orderRoutes.js")

router.get("/products", productRoutes)

router.get("/orders", orderRoutes)

module.exports = router