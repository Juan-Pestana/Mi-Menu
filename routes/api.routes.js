const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant.model');

router.get('/restaurants', (req, res, next) => {

    Restaurant
        .find()
        .then(response => res.json(response))
        .catch(err => next(err))
})

module.exports = router