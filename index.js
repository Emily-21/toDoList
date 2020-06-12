const express = require('express');
const hbs = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');


const ToDoList = require('./models/userModel')

mongoose.connect(`${process.env.DATABASE_URL}`,{useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: 'hbs'
}));

app.set('view engine', '.hbs')

app.get('/', (req,res) => {
    res.render('index')
})

app.post('/', async (req, res) => {
const item = new ToDoList({
    title: req.body.title,
    details: req.body.details,
});
await item.save() 
res.render('index', {item})
})






app.listen(3000, () => {
    console.log('server running on port 3000');
})