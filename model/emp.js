const mongoose = require("mongoose")
const empSchema = new mongoose.Schema({
    registrationNo:{type:String,require:true},
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    phone:{type:String,required:true},
    address:{type:String,required:true},
    specialization:{type:String,required:true},
    hospital:{type:String,required:true},
    emptype:{type:String,required:true},// doctor or labtech
    timetable:[{
            day:[String],
            timing:[String]
    }]
})


