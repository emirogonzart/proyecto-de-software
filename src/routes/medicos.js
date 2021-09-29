const express = require('express');
const router = express.Router();

const Medico = require('../models/Medicos');
const passport = require('passport')

//Para que autentique en base a lo descrito en passport
router.post('/medico/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/ingresar-login',
    failureMessage: true
}));

router.post('/medico/login', (req, res) => {
    const { email, password } = req.body;
    const errors = [];
    if (!email) {
        errors.push({ text: 'Por favor ingrese su usuario' });
    }
    if (!password) {
        errors.push({ text: 'Por favor ingrese su contraseña' });
    }

    if (errors.length > 0) {
        res.render('iniciar-sesion', {
            errors
        });
    } else {
        res.send('Ok');
    }
    //console.log(req.body);
});

module.exports = router;