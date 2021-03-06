const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const fs = require('fs');

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
        default : 18,
        max:100
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
studentSchema.pre('save',async function(){
    fs.writeFile('presave.txt','one data is trying to be saved',(e)=>{
        if (e) throw e;
    })
})
// pre => function 執行之前 , post 執行之後

// create an instance method
// studentSchema.methods.emplyeeName = function(){
//     return 'mr.' + this.name;
// }

// create a model for students

const Student = mongoose.model('Student',studentSchema);

// create an object

const newStudent = new Student({
    name:'luke xxxxx',
    age:38,
    work:'manager',
})
newStudent.save()
.then((res)=>{
    console.log('has been saved')
})
.catch((err)=>{
    console.log('has not been saved')
    console.log(err)
})
// instansce method
// Student.findOne({name:'albert huang'})
// .then((data)=>{
//     console.log(data.emplyeeName())
// })
// Student.find({})
// .then((data)=>{
//     data.forEach((item)=>{
//         console.log(`the emplyee name is ${item.emplyeeName()}`)
//     })
// })

// newStudent.save()
// .then(()=>{
//     console.log('data has been saved')
// })
// .catch((err)=>{
//     console.log('error has happend',err)
// })

// ===  validate ===

// Student.findOneAndUpdate(
//     {name:'frank yung'},{age:101},
//     {new:true, runValidators:true}
// )
// .then((res)=>{
//     console.log('update success')
// })
// .catch((err)=>{
//     console.log('update failed')
//     console.log(err)
// })


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