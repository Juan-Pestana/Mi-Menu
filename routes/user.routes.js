const express = require('express')
const router = express.Router()

const User = require("../models/user.model")

const Restaurant = require("../models/restaurant.model")

const Order = require("../models/orderMenu.model")


const checkLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/user-login', { message: 'Desautorizado, incia sesión para continuar' })

router.get("/index", checkLoggedIn, (req, res) => {
    Restaurant.find()
        // req.user.populate('order')
        // console.log(req.user.order)
        .then(data => {
            res.render('user/user-index', { user: req.user, key: process.env.KEY, restaurant: data })

        })

})

router.get('/restaurant-detail/:id', (req, res) => {
    const id = req.params.id
    Restaurant.findById(id)

        .then(resdetail => res.render('user/detalles', resdetail))
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




router.post('/order/:id', (req, res) => {
    const resId = req.params.id
    const userId = req.user.id

    const { starter, main, dessert, price } = req.body
    const date = new Date()

    Order.create({ starter, main, dessert, price, userId, date })
        .then(newOrder => {
            const infoUpdate = req.user
            infoUpdate.order = newOrder._id

            User.findByIdAndUpdate(userId, infoUpdate)
                .populate('Order')
                .then(() => res.redirect('/user/index'))
                .catch(err=>console.log(err))
        })
})

module.exports = router