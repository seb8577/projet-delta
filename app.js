const express           = require('express');
const exphbs            = require('express-handlebars');
const mongoose          = require('mongoose');
const bodyParser        = require('body-parser');
const fileupload        = require('express-fileupload');
const path              = require('path');
const expressSession    = require('express-session');
const MongoStore        = require('connect-mongo');
const connectFlash      = require('connect-flash');
const {stripTags}       = require('./helpers/hbs');

const app        = express();
mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true});
// mongoose.connect("mongodb+srv://seb:Use7soap85.@projet-delta-bzx4v.mongodb.net/test?retryWrites=true", {useNewUrlParser: true}).then("mongo conected")

const mongoStore = MongoStore(expressSession)

app.use(connectFlash())

// assigne un cookies à chaque connexion
app.use(expressSession({
    secret: 'securite',
    name:   'biscuit',
    saveUninitialized: true,
    resave: false,

    store: new mongoStore(                                  // stocker les cookies dans mongodb
        {mongooseConnection: mongoose.connection}
    )

}))

// css
app.use(express.static('public'));


// route
app.engine('handlebars', exphbs({
    helpers: {
        stripTags: stripTags
    },
    defaultLayout: 'main'
}));
app.set('view engine'  , 'handlebars');
app.use('*', (req, res, next) => {
    res.locals.user = req.session.userId;
    console.log(res.locals.user);
    next()
})

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.use(fileupload())

const auth = require("./middleware/auth")
const redirectAuthSuccess = require('./middleware/redirectAuthSuccess')


// handlebars.moment(date)
var Handlebars    = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);


// post
const Post = require("./database/models/article")


// controllers articles
const contactPage           = require('./controllers/contact')
,     articlesAddPage       = require('./controllers/articlesAdd')
,     mapAfsPage            = require('./controllers/mapafs')
,     mapTznPage            = require('./controllers/maptzn')
,     mapPbPage             = require('./controllers/mappb')
,     aboutPage             = require('./controllers/about')
,     indexPage             = require('./controllers/index')
,     articlesPage          = require('./controllers/articles')
,     articlesPostPage      = require('./controllers/articlesPost')
// middleware
,     articleValidPost      = require('./middleware/articleValidPost')
// user
,     userCreate            = require('./controllers/userCreate')
,     userRegister          = require('./controllers/userRegister')
,     userLogin             = require('./controllers/userLogin')
,     userLoginAuth         = require('./controllers/userLoginAuth')
,     userLogout            = require('./controllers/userLogout')


// route articles
// recupération /contact (exemple <a href="/contact"></a> dans le html ou boutton ...)
// qui va ensuite chercher la variable contactPage qui contient la page
app.get('/contact'          , contactPage)
app.get('/articles/add'     , auth, articlesAddPage)
app.get('/mapafs'           , mapAfsPage)
app.get('/maptzn'           , mapTznPage)
app.get('/mappb'            , mapPbPage)
app.get('/about'            , aboutPage)
app.get('/'                 , indexPage)
app.get('/articles/:id'     , articlesPage)
app.post('/articles/post'   , auth, articleValidPost, articlesPostPage)
// middleware
app.use('/article/post'     , articleValidPost)
app.use('/article/add'      , auth)
// user
app.get('/user/create'      , redirectAuthSuccess, userCreate)
app.post('/user/register'   , redirectAuthSuccess, userRegister)
app.get('/user/login'       , redirectAuthSuccess, userLogin)
app.post('/user/loginAuth'  , redirectAuthSuccess, userLoginAuth)
app.get('/user/logout'      , userLogout)


// error 404
app.use( (req, res) => {
    res.render('error404')
})


app.listen(3000, function () {
    console.log("le serveur tourne sur le port 3000");
})