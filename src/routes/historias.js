const express=require('express');
const { request } = require('http');
const router=express.Router();
const Historia = require('../models/Historias')

router.post('/historias/add-historia', async (req,res)=>{
    const {cedula, nombre, apellido, email, tlf, direccion, antecedentes, tto, examen, diagnostico}= req.body
    const errors=[];
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
    if(!email){
        errors.push({text: 'Por favor ingrese correo del paciente'})
    }
    if(!tlf){
        errors.push({text: 'Por favor ingrese un número de tlf'})
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
        res.render('./historias/add-historia',{
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
    }else {
        const newHistoria= new Historia({cedula, nombre, apellido, email, tlf, direccion, antecedentes, tto, examen, diagnostico});
        await newHistoria.save(); //Guardamos los datos dentro de MongoDB
        res.send('./historias/add-historia');
    }
});

router.get('/historias/add',(req,res)=>{
    res.render('historias/add-historia');
});

router.get('/historias/all', async (req,res)=> {
    const pacientes = await Historia.find({}).lean();
    res.render('historias/all-historias',{pacientes});
});

router.post('/historias/find',async (req,res)=>{
    const {cedula}= req.body
    const find= await Historia.findOne({cedula: cedula}).exec();
    res.render('historias/all-historias', {find});
});

router.get('/historias/update-find', (req,res)=>{
    res.render('historias/update-history')
});

router.post('/historias/update', async (req,res)=> {
    const{cedula}=req.body
    const update= await Historia.find({cedula: cedula}).lean();
    res.render('historias/update', {update})
});

router.post('/historias/update-modify', async (req,res)=> {
    const {cedula, nombre, apellido, email, tlf, direccion, antecedentes, tto, examen, diagnostico}= req.body
    const errors=[];
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
    if(!email){
        errors.push({text: 'Por favor ingrese correo del paciente'})
    }
    if(!tlf){
        errors.push({text: 'Por favor ingrese un número de tlf'})
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
    if(!errors){
        errors.push({text: "Paciente modificado con exito"})
    }
    if(errors.length>0){
        res.render('./historias/update-history',{
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
        const update= await Historia.updateOne({cedula: cedula},{
            "cedula": cedula,
            "nombre": nombre,
            "apellido": apellido,
            "email": email,
            "tlf": tlf,
            "direccion": direccion,
            "antecedentes": antecedentes,
            "tto": tto,
            "examen": examen,
            "diagnostico": diagnostico
        });
        res.redirect('../historias/all')
        /*res.render('historias/update-history',{errors,update})*/
    } 
            
  });

module.exports = router;