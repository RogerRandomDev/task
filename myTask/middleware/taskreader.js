const { response } = require("express")
let {tasks,IID,buildList}= require("../data.js")

const readTasks = (req,res)=>{
    
}
const createTask = (req,res)=>{
    
    const {name,id} = req.body
    if(id){return completeTask(req,res)}
    if(name){
        IID++
        tasks.push({id:IID,name:name,completed:false})
        return res.status(201).redirect('/');
    }
    
    res.status(404).json({success:false,msg:"Please provide a name"})
}

const completeTask= (req,res)=>{
    const {id} = req.body
    console.log(id)
    if(id<tasks.length){tasks[id].completed=!tasks[id].completed
        console.log(tasks)
        return res.status(201).send(buildList(tasks,res))

    }
    //if(id){tasks=tasks.filter(e=>e.id!=id);return res.status(201).send(buildList(tasks,res))}
    res.status(404).send(buildList(tasks,res))
    
}



module.exports={readTasks,createTask,completeTask,tasks}