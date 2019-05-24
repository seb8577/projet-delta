module.exports = (req, res) => {

    res.render("register", {
        errors: req.flash('registerError'),                 // afficher message d'erreur sur la page register
        data: req.flash('dart')[0]                          // récuperer le contenu et le mémoriser
    })
}