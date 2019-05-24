const bcrypt = require('bcrypt')
const user = require('../database/models/user')

module.exports = (req, res) => {

    const {email, password} = req.body;

    user.findOne({email}, (error, user) => {
        if(user) {

            bcrypt.compare(password, user.password, (error, same) => {
                if(same) {

                    req.session.userId = user._id           // prend la valeur de l'id au lieu de la valeur du cookies

                    res.redirect('/')                       // si mot de passe ok = redirection à l'accueil
                }
                else {
                    res.redirect('/user/login')             // si mot de passe faux = on reste sur la page
                }
            })

        } else {
            return res.redirect('/user/login')              // si email faux = on renvoie sur 1er else
        }
    })

}