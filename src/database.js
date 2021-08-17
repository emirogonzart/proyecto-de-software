const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/histomed',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

.then(db=>console.log('BD Conectada'))
.catch(err=>console.error('err'))