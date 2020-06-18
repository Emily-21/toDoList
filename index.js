const express = require('express');
const hbs = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');


const ToDoList = require('./models/toDoModel')

mongoose.connect(`${process.env.DATABASE_URL}`,{useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: 'hbs'
}));

app.set('view engine', '.hbs')

app.get('/', async (req,res) => {
    let toDoItems = await ToDoList.find({})

    toDoItems = toDoItems.map((item) => {
       return item.toObject()
    });

  // items = items.map(item => item.toObject());

    res.render('index', {toDoItems})
})

app.post('/', async (req, res) => {
    const item = new ToDoList({
        title: req.body.title,
        details: req.body.details,
    });
    await item.save().catch(()=>{
        res.render('index', {err: "error"})
        return;
    });

    res.redirect('/');
}) 






app.listen(3000, () => {
    console.log('server running on port 3000');
})