

let tasks=[]
let IID=tasks.length-1;


const buildList=(req,res)=>{
    
    IID=tasks.length-1;let usedIds=[]
    //deals with duplication happening sometimes
    
    tasks=tasks.filter((e)=>{if(usedIds.includes(e.name)){return false};usedIds.push(e.name);return true})
    let builtList='<link rel="stylesheet" href="./style.css">'
    //if(tasks.length<1){return res.status(200).send(builtList)}
    builtList+="<div class='taskcontainer'>"
    for(let i=0;i<tasks.length;i++){
        const task=tasks[i].name
        const ID=i
        const className=(tasks[i].completed?"completeTask":"incompleteTask")
        builtList+=`<div class="hold"><p>${task}</p><button onMouseDown='completeTask(${ID})' class="${className}"></button></div>`
    }
    
    builtList+="</div>"
    return res.status(200).send(builtList)}
const updateTasks=(inp)=>{tasks=inp}
module.exports={tasks,IID,buildList,updateTasks};