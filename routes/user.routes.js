const express = require('express')
const router = express.Router()

const User = require("../models/user.model")



router.get("/index", (req, res) => res.render('user/user-index', { user: req.user, key: process.env.KEY }))


router.get('/update-user/:id', (req, res, next) => {
    const id = req.params.id

    User.findById(id)
        .then((theUser) => res.render('user/user-edit', theUser))
        .catch(err => next(err))
})

router.post('/update-user/:id', (req, res) => {

    const id = req.params.id
    const { name, username, email, phone } = req.body

    User.findByIdAndUpdate(id, { name, username, email, phone })
        .then(() => res.redirect('/user/index'))
        .catch(err => next(err))
})


router.get('/delete-user/:id', (req, res, next) => {

    const id = req.params.id

    User.findByIdAndDelete(id)
        .then(() => res.redirect('/'))
        .catch(err => next(err))
})


module.exports = router