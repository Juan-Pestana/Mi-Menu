const express = require('express')
const router = express.Router()

const User = require("../models/user.model")
const Restaurant = require("../models/restaurant.model")

const Order = require("../models/orderMenu.model")
const transporter = require('./../configs/nodemailer.config')
const { populate } = require('../models/user.model')



const checkLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/user-login', { message: 'Desautorizado, incia sesión para continuar' })
const checkIsUser = (req, res, next) => req.user.favRestaurants ? next() : res.render('auth/user-login', { message: 'Desautorizado, incia sesión para continuar' })

router.get("/index", checkLoggedIn, checkIsUser,(req, res) => {
    Restaurant.find()
        .then(data => {
            User.findById(req.user.id)
                .populate('order')
                .populate('favRestaurants')
                .then(userData => res.render('user/user-index', { user: userData, key: process.env.KEY, restaurant: data }))
        })
})

router.post('/add-favourites/:id', (req, res) => {
    const resId = req.params.id

    const userId = req.user.id

    const infoToUpdate = req.user
    infoToUpdate.favRestaurants.push(resId)

    User.findByIdAndUpdate(userId, infoToUpdate)
        .then(() => res.redirect('/user/index'))
        .catch(err => next(err))
})


//DETALLES RESTAURANTE (USER INDEX)

router.get('/restaurant-detail/:id', (req, res, next) => {
    const id = req.params.id
    Restaurant.findById(id)

        .then(resdetail => res.render('user/detalles', resdetail))
        .catch(err => next(err))
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



//PEDIDO USUARIO
router.post('/order/:id', (req, res, next) => {
    const resId = req.params.id
    const userId = req.user.id
    const name = req.user.name
    const email = req.user.email

    const { starter, main, dessert, price } = req.body
    const date = new Date()
    transporter.sendMail({
        from: 'Mi Menu app <miappprj@gmail.com>',
        to: email,
        subject: `Pedido realizado por, ${name}`,
        text: `Su pedido es: ${starter}, ${main}, ${dessert} y el precio es de: ${price}`,
    })
        .then(info => info)
   Order.create({ starter, main, dessert, price, userId, date })
        .then(newOrder => {
            const infoUpdate = req.user
            infoUpdate.order = newOrder._id
            User.findByIdAndUpdate(userId, infoUpdate)
                // .populate('order')
                //ojo que a lo mejor hay que traer la linea 100 de vuelta paqui
                .then(() => {
                    Restaurant.findById(resId)
                        .then((restInfo) => {
                            restInfo.order.push(newOrder._id)
                            Restaurant.findByIdAndUpdate(resId, restInfo)
                                .then(() => res.redirect('/user/index'))
                        })
                })
                .catch(err => console.log(err))
        })
})     


    




module.exports = router




// Order.create({ starter, main, dessert, price, userId, date })
//         .then(newOrder => {
//             let infoUpdate = req.user
//             infoUpdate.order = newOrder._id
//             User.findByIdAndUpdate(userId, infoUpdate)
//             .then(() => Restaurant.findById(resId))
//             .then((restInfo) =>{
//             restInfo.order.push(newOrder._id)
//             Restaurant.findByIdAndUpdate(resId, restInfo)}) 
//             .then(() => res.redirect('/user/index'))
//             .catch(err => next(err))
        
//         })
        
        
//     })