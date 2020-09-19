const express = require('express')
const router = express.Router()




router.get("/index", (req, res) => res.render('user/user-index', {
    key: process.env.KEY,
    name: req.user.name,
    email: req.user.email,
    phone: req.user.phone,
   
}))



module.exports = router