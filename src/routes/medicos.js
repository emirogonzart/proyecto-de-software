const express=require('express');
const router=express.Router();

const Medico = require('../models/Medicos');
const passport = require('passport')

//Para que autentique en base a lo descrito en passport
router.post('/medicos/login', passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureMessage: true
})); 

router.post('/medicos/login', (req,res)=> {
    const {email,password}=req.body;
    const errors= [];
    if(!user){
        errors.push({text: 'Por favor ingrese su usuario'});
    }
    if(!password){
        errors.push({text: 'Por favor ingrese su contraseña'});
    }

    if(errors.length > 0){
        res.render('iniciar-sesion', {
            errors
        });
    } else {
        res.send('Ok');
    }
    //console.log(req.body);
});

module.exports = router;