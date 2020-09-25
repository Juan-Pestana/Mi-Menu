const mongoose = require("mongoose")
const Schema = mongoose.Schema


const userSchema = new Schema({
    name: {
        type: String,
        default: 'Desconocido',
    },
    username: {
        type: String,
        default: 'Usuario',
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        validate: {
            validator: function (val) {
                let email = new RegExp("[a-zA-Z0-9_.-]+@+[a-zA-Z0-9_.-]+.+[a-zA-Z]")
                return email.test(val);
            },
            message: ` is not a valid email!`
        },
       
    },

    phone: {
        type: Number,
        required: true

    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },

    favRestaurants: [{
        type: Schema.Types.ObjectId,
        ref: 'restaurant'
    }],

}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = User


















// phone: {
//     type: Number,
//     validate: {
//         validator: function (v) {
//             let num
//             return /\d{3}-\d{3}-\d{4}/.test(v);
//         },
//         message: props => `${props.value} is not a valid phone number!`
//     },
//     required: [true, 'User phone number required']
// },
