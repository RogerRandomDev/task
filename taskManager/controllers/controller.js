require('dotenv').config()

const connectDB = require('../db/connect')
const Product = require('../models/Task')
const jsonProducts = require('../products.json')
let {tasks}=require("../data")

const start = async () => {
    tasks=[]
    try{
        await connectDB(process.env.MONGO_URI)
        await (await Product.find()).forEach((data)=>tasks.push({name:data.name,completed:data.completed}))
//        await Product.create(jsonProducts)
        updateTasks(tasks)
        
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
let {IID,buildList,updateTasks}= require("../data")
//updates the task info in the data file
const updateTask=(inp)=>{tasks=inp;updateTasks(inp)}
const readTasks = (req,res)=>{
    
    return res.status(201).json(tasks)
}
//make a new task
const createTask = (req,res)=>{
    
    const {name,id} = JSON.parse(req.body)
    
    if(name){
        tasks.push({name:name,completed:false})
        let usedNames=[]
        //prevents duplicates
        tasks=tasks.filter((e)=>{if(usedNames.includes(e.name)){return false}else{usedNames.push(e.name);return true}})
        updateTask(tasks)
        update(tasks)
        return res.status(201).json({success:true});
    }
    
    res.status(404).json({success:false,msg:"Please provide a name"})
}
//swaps between complete and incomplete
const completeTask= (req,res)=>{
    
    const {id} = JSON.parse(req.body)
    let usedNames=[]
    tasks=tasks.filter((e)=>{if(usedNames.includes(e.name)){return false}else{usedNames.push(e.name);return true}})
    if(id==-1){return buildList(tasks,res)}
    if(id<tasks.length){tasks[id].completed=!tasks[id].completed
        update(tasks)
        return buildList(tasks,res)
    }
    update(tasks)
    buildList(tasks,res)
    
}
//removes completed tasks
const deleteTasks= (req,res)=>{
    let usedNames=[]
    tasks=tasks.filter(e=>!e.completed);
    tasks=tasks.filter((e)=>{if(usedNames.includes(e.name)){return false}else{usedNames.push(e.name);return true}})
    updateTasks(tasks)
    update(tasks)
    buildList(tasks,res)
    
}
//grabs list from database
const preload=()=>{start();}

module.exports ={start,update,readTasks,createTask,completeTask,deleteTasks,updateTask,preload};
