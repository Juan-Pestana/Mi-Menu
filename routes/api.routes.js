const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant.model');

router.post('/restaurants', (req, res, next) => {
  // router.get('/restaurants/:cordinates', (req, res, next) => {

  let coordinates = req.body
  console.log(coordinates)
  let distance= 500
  coordinates.distance ? distance = coordinates.distance : distance= 500
  
  // distance = coordinates.distance
 

    Restaurant
         .find({
            location:
              { $near :
                 {
                   $geometry: { type: "Point",  coordinates: [ coordinates.lng, coordinates.lat] },
                   $minDistance: 0000,
                   $maxDistance: distance
                 }
              }
          })
        .then(response => res.json(response))

        .catch(err => next(err))
})

router.post('/orders', (req,res)=>{
    id = req.user.id

    Restaurant.findById(id)
    .populate('order')
    .then(response => {res.json(response.order)})
      
    .catch(err => next(err))


})

 module.exports = router