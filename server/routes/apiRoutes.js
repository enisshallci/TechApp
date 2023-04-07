const express = require('express')
const router = express.Router()
const getPlaces = require("../controllers/controller1")

router.get("/", getPlaces)

module.exports = router