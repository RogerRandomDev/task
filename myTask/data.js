let tasks=[
    {id:-1,name:"i'm just here to solve the jank",completed:false},
    {id:0,name:"gloat on codewars score",completed:false},
    {id:1,name:"make a game",completed:false},
    {id:2,name:"procrastinate",completed:false}]
let IID=tasks.length-1;


const buildList=(req,res)=>{
    if(req==""){req=tasks}
    tasks=req;IID=tasks.length-1;let usedIds=[]
    //deals with duplication happening sometimes
    tasks=tasks.filter((e)=>{if(usedIds.includes(e)){return false};usedIds.push(e);return true})
    
    let builtList='<link rel="stylesheet" href="./style.css">'
    if(tasks.length==0){return res.status(200).send(builtList)}
    for(let i=1;i<tasks.length;i++){
        const task=tasks[i].name
        const ID=i
        const className=(tasks[i].completed?"completeTask":"incompleteTask")
        builtList+=`<div class="hold"><p>${task}</p><button onMouseDown='completeTask(${ID})' class="${className}"></button></div>`
    }

    res.status(200).send(builtList)}

module.exports={tasks,IID,buildList};