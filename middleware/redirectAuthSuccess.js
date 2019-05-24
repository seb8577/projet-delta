// si la personne s'identifie correctement, elle est redirigée vers ...
const user = require('../database/models/user')

module.exports = (req, res, next) => {

    if(req.session.userId) {
        return res.redirect('/articles/add')            // redirige vers la page "add an article"
    }
    next()

}