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
        subject: name,
        text: 'Gracias por registrarte en nuestra app Mi-App',
        
    })
    .then(info => console.log('INFORMACIÓN DEL ENVÍO', info))
    .catch(err => console.log('HUBO UN ERROR:', err))


    if (username.length === 0 || password.length === 0 || email.length === 0 || !phone || name.length === 0) {
        res.render("auth/user-signup", { message: "Cumplimenta toda la información porfavor" })
        return
    }

    User.findOne({ username })
        .then(user => {
            if (user) {
                res.render("auth/user-signup", { message: "El usuario ya está registrado" })
                return
            }

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User.create({ name, username, password: hashPass, email, phone })
                .then(() => {
                    ///// podríamos logearle automáticamente tras realizar el registro????
                    //// mandar mail al usuario recien registrado///

                    res.redirect('/login-user')
                })
                .catch(error => next(error))
        })
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

router.get('/logout', (req, res, next) => {
    req.logout()
    res.render('auth/user-login', { message: 'Sesión cerrada' })
})







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

    Restaurant.findOne({ username })
        .then(user => {
            if (user) {
                res.render("auth/restaurant-signup", { message: "El usuario ya está registrado" })
                return
            }

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            Restaurant.create({ name, username, password: hashPass, email, phone, opening, photos, logo, address, location })
                .then(() => {
                    ///// podríamos logearle automáticamente tras realizar el registro????
                    //// mandar mail al usuario recien registrado///

                    res.redirect('/restaurant-login')
                })
                .catch(error => next(error))
        })
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


// Logout

module.exports = router