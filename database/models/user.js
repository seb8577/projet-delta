const bcrypt = require("bcrypt")
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema ({

    name: {
        type: String,
        required: [true, "The name is required"],
    },

    email: {
        type: String,
        required: [true, "The email is required"],
        unique: true
    },

    password: {
        type: String,
        required: [true, "The password is required"]
    },
})

// cryptage password
userSchema.pre('save', function (next) {                        // utiliser function et non =>

    const user = this

    bcrypt.hash(user.password, 10, (error, encrypted) => {
        user.password = encrypted
        next()
    })
})

module.exports = mongoose.model("user", userSchema)
