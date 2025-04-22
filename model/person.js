const mongoose = require("mongoose")

const personschema = new mongoose.Schema({
    //personal info
    personName:{type:String, require:true},
    phone:{type:Number},
    password:{type:String},
    aadharNo:{types:Number},
    dateofbirth:{type:Date,require:true},
    personAge:{type:Number,require:true},
    gender:{ type:String, enum:['Male','Female','Other'], require:true},
    addres:{
        street:{type:String,require:true},
        city:{type:String,require:true},
        pin:{type:Number},
        state:{type:String}
    },
   
    emergencycontact:{
        name:{type:String},
        phone:{type:Number},
        relationship:{type:String}
    },

    //appointment details
    appointment:[
        {
        description:{ type:String},
        visitinfo:{
            appointmentDate:{type:Date, default: Date.now()},
            visitDate:{type:Date},
            visitTime:{type:String},
            token:{type:String},
            doctor:{
                name:{type:String},
                specialisation:{type:String},
                day:{type:String},
                time:{type:String}
            }
        },
    }],
    //doctor result here
    result:[{ 
        date:{type:Date},
        description:{type:String},
        testrequired:[String],
        doctor:{
            name:{type:String},
            specialisation:{type:String},
        }
    }],
    testresult:[{
        testname:{type:String},
        date:{type:Date},
        testresult:{type:String},
        doctor:{
            name:{type:String},
            designation:{type:String}
        }
    }]
    
})