const express = require('express');
const router = express.Router();

const Medico = require('../models/Medicos');
const passport = require('passport');
const Medicos = require('../models/Medicos');

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

router.get('/medicos/registrar',(req,res)=>{
    res.render('medicos/registrar');
});

router.post('/medicos/nuevo-medico',async (req,res)=>{
    const {cedula, nombre, apellido, email, tlf, passwd1, passwd2, mpps, especialidad, direccion}= req.body;
    const errors = [];
    //Validacion de campos del formulario que no esten vacios
    
    if(passwd1 != passwd2){
        errors.push({text: 'Las contraseñas no coinciden, por favor verifique la contraseña'})
    }
    
    if(errors.length > 0){
        res.render('./medicos/registrar', {
            errors,
            cedula,
            nombre,
            apellido,
            tlf,
            mpps,
            email,
            passwd1,
            passwd2,
            especialidad,
            direccion
        });
    }else{
        const newMedico= new Medicos({cedula, nombre, apellido, email, tlf, direccion, especialidad, passwd1, passwd2, mpps});
        await newMedico.save(); //Guardamos los datos dentro de MongoDB
        res.redirect('/iniciar-sesion');
    }
});
module.exports = router;