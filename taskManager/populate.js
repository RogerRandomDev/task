require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/Task')
const jsonProducts = require('./products.json')
let {tasks}=require("./data")

const start = async () => {
    tasks=[]
    try{
        await connectDB(process.env.MONGO_URI)
        await (await Product.find()).forEach((data)=>tasks.push({name:data.name,completed:data.completed}))
//        await Product.create(jsonProducts)
        console.log('load Successful')
        
        }
    catch(err){
    console.log(err)
    
        }
}
const update = async (taskData)=>{
    try{
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany();
        await Product.create(taskData)
        tasks=taskData
        console.log('Upload Successful')
        
        }
    catch(err){
    console.log(err)
    
        }
}
start()
//the taskreader moved here because it needs to be here to prevent cyclic reccursion
const { response } = require("express")
let {IID,buildList}= require("./data")
const updateTasks=(inp)=>{tasks=inp}
const readTasks = (req,res)=>{
    
    return res.status(201).json(tasks)
}
const createTask = (req,res)=>{
    
    const {name,id} = JSON.parse(req.body)
    if(id){return completeTask(req,res)}
    if(name){
        if(tasks.filter((e)=>{e.name==name}).length!=0){return res.status(201).json({success:true});}
        tasks.push({name:name,completed:false})
        
        return res.status(201).json({success:true});
    }
    
    res.status(404).json({success:false,msg:"Please provide a name"})
}

const completeTask= (req,res)=>{
    const {id} = JSON.parse(req.body)
    
    if(id==-1){return res.status(200).send(buildList(tasks,res))}
    if(id<tasks.length){tasks[id].completed=!tasks[id].completed
        
        return res.status(201).send(buildList(tasks,res))
    }
    res.status(404).send(buildList(tasks,res))
    
}
const deleteTasks= (req,res)=>{
    let usedNames=[]
    tasks=tasks.filter(e=>!e.completed);
    tasks=tasks.filter((e)=>{if(usedNames.includes(e.name)){return false}else{usedNames.push(e.name);return true}})
    
    return res.status(201).send(buildList(tasks,res))
    
}
const preload=()=>{start();}

module.exports ={start,update,readTasks,createTask,completeTask,deleteTasks,updateTasks,preload};
