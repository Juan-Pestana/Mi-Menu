const express = require('express')
const router = express.Router()

const User = require("../models/user.model")
const Restaurant = require("../models/restaurant.model")


router.get("/index", (req, res) => {
    
    console.log(req.user)
    res.render('user/user-index', { user : req.user, key: process.env.KEY })
})


module.exports = router