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
    name:{
        type:String,
        required : [true,'you forget to input the name'],
        maxlength:[15,'name is too long.']
    },
    age:{
        type:Number,
        required : true,
        default : 18
    },
    work:{
        type:String,
        default : "undecided",
        enum:[
            'front end engineer',
            'sale',
            'manager',
            'student'
        ]
    },
    mojor:{
        highschool:{
            type:String,
            default : "undecided"
        },
        university:{
            type:String,
            default : "undecided"
        }
    }
})

// create a model for students

const Student = mongoose.model('Student',studentSchema);

// create an object

const newStudent = new Student({
    name:'luke',
    age:38,
    work:'teacher',
})
newStudent.save()
.then(()=>{
    console.log('data has been saved')
})
.catch((err)=>{
    console.log('error has happend',err)
})

// ===  validate ===



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