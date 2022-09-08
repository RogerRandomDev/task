const mongoose= require('mongoose');

const TaskSchema = new mongoose.Schema({
    name:{
        type: 'string',
        required:[true,'Must Provide Name'],
        trim:true,
        maxLength:40   
    },
    completed:{
        type: Boolean,
        default: false
    }
})

module.exports=mongoose.model("Task",TaskSchema)
Model.find({completed:true})