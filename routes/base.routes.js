const express = require('express')
const router = express.Router()

const checkLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { message: 'Desautorizado, incia sesión para continuar' })
// const checkRole = rolesToCheck => (req, res, next) => req.isAuthenticated() && rolesToCheck.includes(req.user.role) ? next() : res.render('auth/login', { message: 'Desautorizado, no tienes permisos para ver eso.' })

const checkRole = rolesToCheck => {
    return (req, res, next) => {
        if (req.isAuthenticated() && rolesToCheck.includes(req.user.role)) {
            next()
        }
        else {
            res.render('auth/login', { message: 'Desautorizado, no tienes permisos para ver eso.' })
        }
    }
}


// Endpoints
router.get('/', (req, res) => res.render('index'))



// router.get('/profile', checkLoggedIn, (req, res, next) => res.render('profile', req.user))
// router.get('/view-documentation', checkRole(['Student', 'Teacher', 'Admin']), (req, res, next) => res.render('documentation', { user: req.user, isAdmin: req.user.role === 'Admin' }))
// router.get('/edit-documentation', checkRole(['Teacher', 'Admin']), (req, res, next) => res.send('AQUÍ ESTÁ LA EDICIÓN DE LA DOCUEMNTACIÓN'))
// router.get('/remove-documentation', checkRole(['Admin']), (req, res, next) => res.send('AQUÍ ESTÁ LA SUPRESIÓN DE LA DOCUEMNTACIÓN'))

module.exports = router




