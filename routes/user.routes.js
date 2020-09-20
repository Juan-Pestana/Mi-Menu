const express = require('express')
const router = express.Router()


router.get("/index", (req, res) => res.render('user/user-index', { user:req.user, key: process.env.KEY }))


module.exports = router