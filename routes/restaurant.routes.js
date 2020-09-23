const express = require('express')
const router = express.Router()

// const localUploader = require('./../configs/local-upload.config')
const cdnUploader = require('./../configs/cloudinary.config')

const Restaurant = require("../models/restaurant.model")

const checkLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/restaurant-login', { message: 'Desautorizado, incia sesión para continuar' })
const checkIsRestaurant = (req, res, next) => req.user.dailyMenu ? next() : res.render('auth/restaurant-login', { message: 'Desautorizado, incia sesión para continuar' })

router.get("/index", checkLoggedIn, checkIsRestaurant, (req, res) => {

    res.render('restaurant/restaurant-index', { user: req.user, key: process.env.KEY })
})




//-------------------Actualizar los platos del Menú-------------------

router.post('/update-dish/:id', (req, res) => {

    const id = req.user.id
    const { dishName, category, type } = req.body
    const newDish = { name: dishName, category }
    const dailyMenu = {
        starters: req.user.dailyMenu.starters,
        main: req.user.dailyMenu.main,
        dessert: req.user.dailyMenu.dessert,
        date: req.user.dailyMenu.date,
        price: req.user.dailyMenu.price
    }

    if (type === "starters") {
        dailyMenu.starters.push(newDish)
    } else if (type === "main") {
        dailyMenu.main.push(newDish)
    } else {
        dailyMenu.dessert.push(newDish)
    }

    const { name, username, password, email, phone, opening, photos, logo, location } = req.user
    const infoToUpdate = { name, username, password, email, phone, opening, photos, logo, location, dailyMenu }

    Restaurant.findByIdAndUpdate(id, infoToUpdate)
        .then(() => res.redirect('/restaurant/index'))
        .catch(err => next(err))
})





// ------------------Actualizar fecha y precio del Menu--------------

router.post('/update-menu/:id', (req, res) => {
    id = req.user.id

    let { date, price } = req.body
    const dailyMenu = {
        starters: req.user.dailyMenu.starters,
        main: req.user.dailyMenu.main,
        dessert: req.user.dailyMenu.dessert,
        date,
        price,
    }

    const { name, username, password, email, phone, opening, photos, logo, location } = req.user
    const infoToUpdate = { name, username, password, email, phone, opening, photos, logo, location, dailyMenu }

    Restaurant.findByIdAndUpdate(id, infoToUpdate)
        .then(() => res.redirect('/restaurant/index'))
        .catch(err => next(err))
})


//---------------Clean the daily menu before updating-----------------


router.post('/clear-menu/:id', (req, res) => {
    const id = req.params.id

    const dailyMenu = {
        starters: [],
        main: [],
        dessert: [],
        date: new Date(),
        price: 0
    }

    const { name, username, password, email, phone, opening, photos, logo, location } = req.user
    const infoToUpdate = { name, username, password, email, phone, opening, photos, logo, location, dailyMenu }

    Restaurant.findByIdAndUpdate(id, infoToUpdate)
        .then(() => res.redirect('/restaurant/index'))
        .catch(err => next(err))
})



//-------------Update Restaurant Profile-----------------       //Aqui----------------------------

router.post('/update-details/:id', cdnUploader.single('logo'), (req, res) => {

    const id = req.params.id
    const dailyMenu = req.user.dailyMenu

    const location = {
        type: 'Point',
        coordinates: [req.body.longitude, req.body.latitude]
    }
    // let logo = `/uploads/${req.file.filename}`
    const logo = req.file.path


    let { name, username, email, phone, address, opening, photos } = req.body
    let infoToUpdate = { name, username, email, phone, address, opening, photos, logo, location, dailyMenu }

    Restaurant.findByIdAndUpdate(id, infoToUpdate)
        .then(() => res.redirect('/restaurant/index'))
        .catch(err => next(err))
})



module.exports = router