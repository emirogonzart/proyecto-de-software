const express = require('express');
const router = express.Router();

require('../models/Medicos');
const passport = require('passport');
const Medicos = require('../models/Medicos');

//Para que autentique en base a lo descrito en passport
router.post('/medico/login', passport.authenticate('local', {
    successRedirect: '/historias/all',
    failureRedirect: '/iniciar-sesion',
    failureMessage: true
}));

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