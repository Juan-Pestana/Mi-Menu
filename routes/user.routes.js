const express = require('express')
const router = express.Router()

const User = require("../models/user.model")

const Restaurant = require("../models/restaurant.model")


const checkLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/user-login', { message: 'Desautorizado, incia sesión para continuar' })

router.get("/index", checkLoggedIn, (req, res) => {
    Restaurant.find()
        .then(data => res.render('user/user-index', { user: req.user, key: process.env.KEY, restaurant: data }))

})

router.get('/restaurant-detail/:id', (req, res) => {
    const id = req.params.id
    Restaurant.findById(id)

        .then(resdetail => res.render('detalles', resdetail))
        .catch(err => console.log("ERRORR", err))
})

//USER UPDATE
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

//USER DELETE
router.get('/delete-user/:id', (req, res, next) => {

    const id = req.params.id

    User.findByIdAndDelete(id)
        .then(() => res.redirect('/'))
        .catch(err => next(err))
})

router.get('/logout', (req, res, next) => {
    req.logout()
    res.render('auth/user-login', { message: 'Sesión cerrada' })
})

module.exports = router