
const session = require("express-session")
const bcrypt = require("bcrypt")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const flash = require("connect-flash") // error handling

const User = require('../models/user.model')
const Restaurant = require('../models/restaurant.model')

function SessionConstructor(userId, userGroup, details) {
    this.userId = userId;
    this.userGroup = userGroup;
    this.details = details;
  }


module.exports = app => {

    app.use(session({
        secret: "passport-app",
        resave: true,
        saveUninitialized: true
    }))

    // passport.serializeUser((user, cb) => cb(null, user._id))

    passport.serializeUser(function (userObject, cb) {
        // userObject could be a Model1 or a Model2... or Model3, Model4, etc.
        let userGroup = "model1";
        let userPrototype =  Object.getPrototypeOf(userObject);

        if (userPrototype === User.prototype) {
          userGroup = "model1";
        } else if (userPrototype === Restaurant.prototype) {
          userGroup = "model2";
        }
        let sessionConstructor = new SessionConstructor(userObject.id, userGroup, '');
        cb(null,sessionConstructor);
      });


      passport.deserializeUser(function (sessionConstructor, cb) {
        if (sessionConstructor.userGroup == 'model1') {
            User.findById(sessionConstructor.userId, (err, user) => {
                if (err) return cb(err)
                cb(null, user)
            })
        } else if (sessionConstructor.userGroup == 'model2') {
            Restaurant.findById(sessionConstructor.userId, (err, user) => {
                if (err) return cb(err)
                cb(null, user)
            });
        }
      });



    app.use(flash())

    passport.use('user', new LocalStrategy({ passReqToCallback: true }, (req, username, password, next) => {
        User.findOne({ username }, (err, user) => {
            if (err) return next(err)
            if (!user) return next(null, false, { message: "Incorrect username" })
            if (!bcrypt.compareSync(password, user.password)) return next(null, false, { message: "Incorrect password" })
            return next(null, user)
        })
    }))

    passport.use('restaurant', new LocalStrategy({ passReqToCallback: true }, (req, username, password, next) => {
        Restaurant.findOne({ username }, (err, user) => {
            if (err) return next(err)
            if (!user) return next(null, false, { message: "Incorrect username" })
            if (!bcrypt.compareSync(password, user.password)) return next(null, false, { message: "Incorrect password" })
            return next(null, user)
        })
    }))

    app.use(passport.initialize())
    app.use(passport.session())
}