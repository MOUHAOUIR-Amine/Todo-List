const express = require('express');
const todoController = require('./controllers/todoController');

var app=express();

app.set('view engine','ejs');
app.use(express.static('./assets'));
todoController(app);


app.listen(3000);
console.log('u are listening to port 3000');
