const express=require('express');
const router=express.Router();

router.get('/medicos/login',(req,res)=>{
    res.render('login.html', { title: 'Histomed' });
});

router.get('/medicos/login',(req,res)=>{
    res.send('login.html');
});

module.exports = router;