// articles
module.exports = async (req,res) => {

    if(req.session.userId) {
       return res.render("articles/add")                // add an article est accessible uniquement si l'utilisateur a un id (inscription obligatoire)
    }
 
    res.redirect('/user/login')                         // sinon il faut se connecter

}