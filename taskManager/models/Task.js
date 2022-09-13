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

module.exports=mongoose.model("taskManager",TaskSchema)
//Model.find({completed:true})