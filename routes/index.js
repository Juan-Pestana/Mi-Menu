module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes'))
    app.use('/', require('./auth.routes'))
    app.use('/user', require('./user.routes'))
    app.use('/restaurant', require('./restaurant.routes'))
    app.use('/api', require('./api.routes.js'))
}