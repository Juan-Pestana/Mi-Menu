const express = require('express')
const router = express.Router()

const Restaurant = require("../models/restaurant.model")

router.get("/index", (req, res) => {
    
    console.log(req.user)
    res.render('restaurant/restaurant-index', { user : req.user, key: process.env.KEY })
})


module.exports = router