const express = require('express')
const router = express.Router()
const productRoutes = require("./productRoutes.js")

router.get("/products", productRoutes)

module.exports = router