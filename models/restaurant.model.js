const mongoose = require("mongoose")
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    opening: {
        type: String,
        required: true,
    },
    photos: {
        type: String,
 
    },
    logo: {
        type: String,

    },
    address: {
        type: String,
        required: true,
    },
    location: {
        type: {
            type: String
        },
        coordinates: [Number]
    },
    dailyMenu :{
        starters : [{name:{type: String}, category: {type: String, enum: ['ensalada', 'sopa', 'pasta', 'crema', 'pescado', 'carne', 'guiso', 'cocido', 'huevos']}}],
        main : [{name:{type: String}, category: {type: String, enum: ['ensalada', 'sopa', 'pasta', 'crema', 'pescado', 'carne', 'guiso', 'cocido', 'huevos']}}],
        dessert : [{name:{type: String}, category: {type: String, enum: ['fruta', 'tarta', 'chocolate', 'lacteos', 'café']}}],
        price : {type: Number}
    },
    //orders: 

})

restaurantSchema.index({ location: '2dsphere' })


const Restaurant = mongoose.model("User", userSchema);
module.exports = Restaurant