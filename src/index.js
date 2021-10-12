const express = require('express')
const path = require('path')
const hbs = require('express-handlebars')
const { mainModule } = require('process')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('flash')
const passport = require('passport')

//Inicializaciones
const app = express()
require('./database')
require('./config/passport');

//Configuraciones
app.set('port',process.env.PORT  || 3000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',hbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs'
}));
app.set('view engine','.hbs');

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret:'histomed',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//Variables globales
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.errors_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Rutas
app.use(require('./routes/index'));
app.use(require('./routes/medicos'));
app.use(require('./routes/historias'))

//Archivos estaticos
app.use(express.static(path.join(__dirname,'public')))

//Escuchando al servidor
app.listen(app.get('port'), ()=>{
    console.log("Server on port", app.get('port'));
});