// Ce que viens chercher la const contactPage = require('.controllers/contact) dans le app.js
module.exports = async (req,res) => {
    // Envoie de la page contact.handlebars dans les views
    res.render('contact')
}

