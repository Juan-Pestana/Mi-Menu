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
        starters :{type: [{name:{type: String}, category: {type: String, enum: ['ensalada', 'sopa', 'pasta', 'crema', 'pescado', 'carne', 'guiso', 'cocido', 'huevos']}}],
                    default:[] } ,
        main : {type: [{name:{type: String}, category: {type: String, enum: ['ensalada', 'sopa', 'pasta', 'crema', 'pescado', 'carne', 'guiso', 'cocido', 'huevos']}}],
        default:[] } ,
        dessert :{type: [{name:{type: String}, category: {type: String, enum: ['ensalada', 'sopa', 'pasta', 'crema', 'pescado', 'carne', 'guiso', 'cocido', 'huevos']}}],
        default:[] } ,
        date: {type: Date, default: new Date().toJSON().slice(0,10).replace(/-/g,'/')},
        price : {type: Number,
                default: 0}
    },
    order: [{
        type: Schema.Types.ObjectId,
        ref:'Order'
    }],

})

restaurantSchema.index({ location: '2dsphere' })


const Restaurant = mongoose.model("restaurant", restaurantSchema);
module.exports = Restaurant