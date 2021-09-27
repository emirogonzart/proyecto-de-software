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
        res.send('Furula');
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
    const find= await Historia.find({cedula: cedula}).lean();
    res.render('historias/all-historias', {find});
});

router.get('/historias/update', async (req,res)=> {
    const{cedula, nombre, apellido, email, tlf, diagnostico, tto, direccion, examen, antecedentes}=req.body
    const update= await Historia.findOne({cedula: cedula});
    console.log(cedula);
    res.render('historias/update-history', {update})
});

module.exports = router;