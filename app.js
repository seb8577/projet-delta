const express    = require('express');
const exphbs     = require('express-handlebars');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const path       = require('path');

const app        = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(fileupload())

mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true});

// handlebars.moment(date)
var Handlebars    = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

// post
const Post = require("./database/models/article")

// Routes
const contactPage           = require('./controllers/contact')
,     articlesAddPage       = require('./controllers/articlesAdd')
,     mapAfsPage            = require('./controllers/mapafs')
,     mapTznPage            = require('./controllers/maptzn')
,     aboutPage             = require('./controllers/about')
,     indexPage             = require('./controllers/index')
,     articlesPage          = require('./controllers/articles')
,     articlesPostPage      = require('./controllers/articlesPost')

// recupération /contact (exemple <a href="/contact"></a> dans le html ou boutton ...)
// qui va ensuite chercher la variable contactPage qui contient la page
app.get('/contact'          , contactPage)
app.get('/articles/add'     , articlesAddPage)
app.get('/mapafs'           , mapAfsPage)
app.get('/maptzn'           , mapTznPage)
app.get('/about'            , aboutPage)
app.get('/'                 , indexPage)
app.get('/articles/:id'     , articlesPage)
app.post('/articles/post'   , articlesPostPage)

// css
app.use(express.static('public'));

// route
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine'  , 'handlebars');

const middleware = (req, res, next) => {
    next()
}

app.use(middleware)

app.listen(3000, function () {
    console.log("le serveur tourne sur le port 3000");
})