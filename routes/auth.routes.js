const express = require("express")
const router = express.Router()
const passport = require("passport")

const User = require("../models/user.model")

const bcrypt = require("bcrypt")
const bcryptSalt = 10

// SIGNUP
router.get("/user-signup", (req, res, next) => res.render("auth/user-signup"))

router.post("/user-signup", (req, res, next) => {

    const {name, username, password, email, phone} = req.body

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

            User.create({name, username, password: hashPass, email, phone })
                .then(() => {
                    ///// podríamos logearle automáticamente tras realizar el registro????
                    //// mandar mail al usuario recien registrado///

                    res.redirect('/')})
                .catch(error => next(error))
        })
        .catch(error => next(error))
})



// LOGIN
// router.get("/", (req, res, next) => res.render("index", { "message": req.flash("error") }))
router.post("/login-user", passport.authenticate("local", {
    successRedirect: "/user/index",
    failureRedirect: "/",
    failureFlash: true,
    passReqToCallback: true
}))

router.get("/restaurant-signup", (req, res, next) => res.render("auth/restaurant-signup"))


// Logout
router.get('/logout', (req, res, next) => {
    req.logout()
    res.render('auth/login', { message: 'Sesión cerrada' })
})

module.exports = router