const user = require('../database/models/user')     // chemin pour stocker les requêtes

module.exports = (req, res) => {
    user.create(                                    // on utilise la méthode create
        req.body, (error, user) => {                // pour récuperer les requêtes dans le body

            if (error) {
                                                                // afficher le message d'erreur
                const registerError = Object.keys(error.errors).map(key => error.errors[key].message);

                req.flash('registerError', registerError)
                req.flash('data', req.body)                     // récuperer le contenu et le mémoriser

               return res.redirect('/user/create')
            }
                 
            res.redirect('/')                                   // une fois terminé, on redirige à l'accueil
        }
    )
}