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
        // .geoNear({type: "Point", coordinates:[-3.7007958999999997 , 40.4406743]}, {maxDistance : 50000, spherical: true})                     //// to do query restaurantes cercanos {Near}
        .then(response => res.json(response))
          // 
        .catch(err => next(err))
})

// router.get('/orders/:_id', (req,res)=>{

//     Restaurant.findById

// })

 module.exports = router