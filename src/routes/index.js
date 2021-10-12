const express=require('express');
const router=express.Router();
const passport = require('passport');

router.get('/',(req,res)=>{
    res.render('index');
});

router.get('/about',(req,res)=>{
    res.render('about');
});

router.get('/iniciar-sesion',(req,res)=>{
    res.render('iniciar-sesion');
});

module.exports = router;