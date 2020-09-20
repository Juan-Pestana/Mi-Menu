const express = require('express')
const router = express.Router()


router.get("/index", (req, res) => res.send("eres un restaurante logeado"))


module.exports = router