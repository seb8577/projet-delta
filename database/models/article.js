const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({

    createDate:{
        type: Date,
        default: new Date()
    },
    title: String,
    content: String,
    image: String,

})

const article = mongoose.model('article', articleSchema)

module.exports = article