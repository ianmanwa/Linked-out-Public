const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true 
    },
    url:{
        type:String,
        required:true 
    },
    tag:{
        type:String,
        required:true 
    },
    rating:{
        type:String,
        required:true
    },
    comments:[{
        type:String,
    }]
},
    {timestamps:true})

    module.exports = mongoose.model("Job", jobSchema)