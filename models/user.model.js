const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    role: {
        type: String,
        enum: ['Student', 'Teacher', 'Manager', 'Admin'],
        default: 'Student'
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema);

module.exports = User