// index
const Post = require("../database/models/article")

module.exports = async (req,res) => {

    const posts = await Post.find({});              // Envoie de la page contact.handlebars dans les views

        console.log(req.session);
    
    res.render("index", {posts}

)}