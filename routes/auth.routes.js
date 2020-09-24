const express = require("express")
const router = express.Router()
const passport = require("passport")

const User = require("../models/user.model")
const Restaurant = require("../models/restaurant.model")

const bcrypt = require("bcrypt")
const bcryptSalt = 10

const transporter = require('./../configs/nodemailer.config')




// USER SIGNUP
router.get("/user-signup", (req, res, next) => res.render("auth/user-signup"))

router.post("/user-signup", (req, res, next) => {

    const { name, username, password, email, phone } = req.body
    transporter.sendMail({
        from: 'Mi App <miappprj@gmail.com>',
        to: email,
        subject: `Te damos la bienvenida, ${name}`,
        text: 'Gracias por registrarte en nuestra app Mi-Menu',
    })
        .then(info => info)
        .catch(err => next(err))


    if (username.length === 0 || password.length === 0 || email.length === 0 || !phone || name.length === 0) {
        res.render("auth/user-signup", { message: "Cumplimenta toda la información porfavor" })
        return
    }

    if( email !== new RegExp("[a-zA-Z0-9_.-]+@+[a-zA-Z0-9_.-]+.+[a-zA-Z]{2,4}")){
        res.render("auth/user-signup", { message: "Escribe email valido" })
        return
    }
    User.findOne({ username })
        .then(user => {
            if (user) {
                res.render("auth/user-signup", { message: "El usuario ya está registrado" })
                return
            }
        })
        .catch(error => next(error))
    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(password, salt)

    User.create({ name, username, password: hashPass, email, phone })
        .then(() => res.redirect('/login-user'))
        .catch(error => next(error))
})




// USER LOGIN
router.get("/login-user", (req, res, next) => res.render("auth/user-login", { "message": req.flash("error") }))

router.post("/login-user", passport.authenticate("user", {
    successRedirect: "/user/index",
    failureRedirect: "/login-user",
    failureFlash: true,
    passReqToCallback: true
}))





// RESTAURANT SIGNUP

router.get("/restaurant-signup", (req, res, next) => res.render("auth/restaurant-signup"))

router.post("/restaurant-signup", (req, res, next) => {

    let location = {
        type: 'Point',
        coordinates: [req.body.longitude, req.body.latitude]
    }

    const { name, username, password, email, phone, opening, photos, logo, address } = req.body

    if (username.length === 0 || password.length === 0 || email.length === 0 || !phone || name.length === 0) {
        res.render("auth/restaurant-signup", { message: "Cumplimenta toda la información porfavor" })
        return
    }
    // if( email !== new RegExp("[a-zA-Z0-9_.-]+@+[a-zA-Z0-9_.-]+.+[a-zA-Z]{2,4}")){
    //     res.render("auth/restaurant-signup", { message: "Escribe email valido" })
    //     return
    // }


    Restaurant.findOne({ username })
        .then(user => {
            if (user) {
                res.render("auth/restaurant-signup", { message: "El usuario ya está registrado" })
                return
            }
        })
        .catch(error => next(error))

    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(password, salt)

    Restaurant.create({ name, username, password: hashPass, email, phone, opening, photos, address, location })
        .then(() => res.redirect('/restaurant-login'))
        .catch(error => next(error))
})



// RESTAURANT LOGIN
router.get('/restaurant-login', (req, res, next) => res.render('auth/restaurant-login', { 'message': req.flash('error') }))

router.post("/restaurant-login", passport.authenticate("restaurant", {
    successRedirect: "/restaurant/index",
    failureRedirect: "/restaurant-login",
    failureFlash: true,
    passReqToCallback: true
}))


module.exports = router