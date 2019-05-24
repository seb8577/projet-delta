const user = require('../database/models/user')

module.exports = (req, res, next) => {

    // connexion dans la base de donnée
    user.findById(req.session.userId, (error, user) => {
        if(error || !user) {
            return res.redirect('/user/login')
        }
        next()
    })

    // vérifier le user


    // si le user est dans la base de donnée


    // sinon tu rediriges le user


}