const express = require('express')
const router = express.Router()


router.get("/index", (req, res)=> res.render('user/user-index', {key : process.env.KEY} ))



module.exports = router