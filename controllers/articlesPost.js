const Post = require("../database/models/article")
,     path = require('path')

// articles post
module.exports = async (req,res) => {

    const {image}    = req.files
    const uploadFile = path.resolve(__dirname, '../public/upload', image.name)

    image.mv(uploadFile, (error) => {
        Post.create(
            {
                ...req.body,
               image: `/upload/${image.name}`
            }
            , (error, post) => {
            res.redirect('/')
            console.log(uploadFile);
            
        })
    })

}