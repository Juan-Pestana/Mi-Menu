const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    starter: {
        type: String,
        required: true
    },
    main: {
        type: String,
        required: true
    },
    dessert: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date
    }
},{
    timestamps: true
})

const Order = mongoose.model("Order", orderSchema);
module.exports = Order