const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');

// connect to mongodb

mongoose.connect('mongodb://localhost:27017/exampleDB')
.then(()=>{
    console.log('connected to mongodb');
})
.catch(err=>{
    console.log('connection failed.');
    console.log(err);
})

// defined  a schema
const studentSchema = new mongoose.Schema({
    name:String,
    age:Number,
    work:String,
    mojor:{
        highschool:String,
        university:String
    }
})

// create a model for students

const Student = mongoose.model('Student',studentSchema);

// create an object

const Albert = new Student({name:'albert huang',age:28,work:'front end engineer'});
const friends = 
    [
        {name:'albert huang',age:28,work:'front end engineer'},
        {name:'brain chen',age:30,work:'sale'},
        {name:'frank yung',age:34,work:'manager'},
        {name:'dan chen',age:25,work:'student'},
    ];

// ===  save  === 

//object => save()
// Albert.save();

// model => insertMany
// Student.insertMany(friends)

// .then((success)=>{
//     console.log(success);
// })
// .catch((err)=>{
//     console.log(err)
// })

// Student.find({})
// .then((data)=>{
//     console.log(data)
// })
// .then(()=>{
//     console.log('albert has been saved to DB')
// })
// .catch((err)=>{
//     console.log('error has happend',err)
// })

// === find objects in students === 
// Student.find({})
// .then((data)=>{
//     console.log(data);
// })

// === find one ===
// Student.findOne({name:'albert huang'})
// .then((data)=>{
//     console.log(data)
// })

// === find ===
// Student.find({})
// .then((data)=>{
//     console.log(data)
// })

// === updateOne ===
// Student.updateOne({name:'albert huang'},{name:'brain chen'})
// .then((msg)=>{
//     console.log(msg)
// })

// Student.find({})
// .then((data)=>{
//     console.log(data)
// })

// === findOneAndUpdate ===
// Student.findOneAndUpdate({name:'brain chen'},{name:'albert huang'},{new:true})
// .then((msg)=>{
//     console.log(msg)
// })

// Student.find({age:{$gte:27}})
// .then(data=>{
//     console.log(data)
// })

// === delete
// Student.deleteOne({name:{$gte:25}})
// .then((msg)=>{
//     console.log(msg)
// })

// Student.findOneAndDelete({age:{$gte:30}})
// .then((msg)=>{
//     console.log(msg)
// })

app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.render('index.ejs')
})

app.listen(3000,(req,res)=>{
    console.log('server is running on port 3000');
})