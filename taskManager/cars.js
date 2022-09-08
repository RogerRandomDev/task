const mongoose=require('mongoose');
const TaskSchema= new mongoose.Schema({
    Brand:{
        type:"string",
        required:true,
        trim:true,
        maxLength:20
    },
    Model:{
        type:"string",
        required:true,
        trim:true,
        maxLength:20

    },
    Year:{
        type:"integer"
    }
})