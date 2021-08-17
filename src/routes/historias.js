const express=require('express');
const { request } = require('http');
const router=express.Router();
const Historias = require('../models/Historias')

router.get('/historias/find',(req,res)=>{
    res.render('/historias/find-historia');
});

router.post('/historias/add-historia', async (req,res)=>{
    const {cedula, nombre, apellido, email, tlf, direccion, antecedentes, tto, examen, diagnostico} = req.body;
    const errors = [];
    if(!cedula){
        errors.push({text: "Por favor ingrese la cédula del paciente"});
    }
    if(!nombre){
        errors.push({text: 'Por favor ingrese el nombre del paciente'});
    }
    if(!apellido){
        errors.push({text: 'Por favor ingrese el apellido del paciente'})
    }
    if(!direccion){
        errors.push({text: 'Por favor ingrese la dirección del paciente'})
    }
    if(!antecedentes){
        errors.push({text: 'Por favor ingrese los antecedentes del paciente'})
    }
    if(!tto){
        errors.push({text: 'Por favor ingrese el tratamiento del paciente'})
    }
    if(!examen){
        errors.push({text: 'Por favor ingrese los resultados del examen fisico del paciente'})
    }
    if(!diagnostico){
        errors.push({text: 'Por favor ingrese el diagnostico del paciente'})
    }
    if(errors.length>0){
        res.render('historias/add-historia',{
            errors,
            nombre,
            apellido,
            cedula,
            email, 
            tlf,
            direccion,
            antecedentes,
            tto,
            examen,
            diagnostico
        });
    }else{
        const newHistorias = new Historias({
            cedula, nombre, apellido, email, tlf, direccion, antecedentes, tto, examen, diagnostico
        });
        await newHistorias.save();
        res.redirect('historias/historias');
    }
})

router.get('/historias/historias', async (req,res)=>{
    const historia= await Historias.find();
    res.render('historias/historias', {historia});
});

router.get('/historias/add',(req,res)=>{
    res.render('historias/add-historia');
});

module.exports = router;