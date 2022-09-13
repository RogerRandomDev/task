const { response } = require("express")
let {tasks,IID,buildList}= require("../data")
const {start,update}=require("../populate")
const updateTasks=(inp)=>{tasks=inp}
const readTasks = (req,res)=>{
    return res.status(200).json(tasks)
}
const createTask = (req,res)=>{
    
    const {name,id} = JSON.parse(req.body)
    if(id){return completeTask(req,res)}
    if(name){
        IID++
        tasks.push({id:IID,name:name,completed:false})

        return res.status(200).json({success:true});
    }
    
    res.status(404).json({success:false,msg:"Please provide a name"})
}

const completeTask= (req,res)=>{
    const {id} = JSON.parse(req.body)
    if(id==-1){return res.status(200).send(buildList(tasks,res))}
    
    if(id<tasks.length){tasks[id].completed=!tasks[id].completed
        return res.status(200).send(buildList(tasks,res))
    }
    res.status(404).send(buildList(tasks,res))
    
}
const deleteTasks= (req,res)=>{
    tasks=tasks.filter(e=>!e.completed);
    return res.status(201).send(buildList(tasks,res))
    
}
const preload=()=>{start();}

module.exports={readTasks,createTask,completeTask,deleteTasks,updateTasks,preload}