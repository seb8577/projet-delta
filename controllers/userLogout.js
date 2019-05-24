module.exports = (req, res) => {
    req.session.destroy(() => {             // quand on se déconnecte
        res.redirect('/')                   // on revient à la page d'accueil
    })
}