const Post = require("../database/models/article")

// about
module.exports = async (req,res) => {
    const posts = await Post.find({});
    // Envoie de la page contact.handlebars dans les views
    // console.log(posts);
    res.render("index", {
        posts
    })
}