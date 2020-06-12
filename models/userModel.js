const {Schema, model} = require('mongoose');

let list = new Schema ({
    title: {type:String, required: true, unique: true},
    details: {type:String, required: true, unique: true},
}, {
    toObject: {
        virtuals:true
    }
});


module.exports = model('toDoList', list);