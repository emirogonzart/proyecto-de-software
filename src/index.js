const express = require('express')
const path = require('path')
const hbs = require('express-handlebars')
const { mainModule } = require('process')
const methodOverride = require('method-override')
const session = require('express-session')

//Inicializaciones
const app = express()
require('./database')

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

//Variables globales

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