let tasks=[
    {id:0,name:"gloat on codewars score",completed:false},
    {id:1,name:"make a game",completed:false},
    {id:2,name:"procrastinate",completed:false}]
let IID=tasks.length-1;


const buildList=(req,res)=>{
    if(req==""){req=tasks}
    tasks=req;IID=tasks.length-1
    let builtList='<link rel="stylesheet" href="./style.css">'
    for(let i=0;i<tasks.length;i++){
        const task=tasks[i].name
        const ID=tasks[i].id
        const className=(tasks[i].completed?"completeTask":"incompleteTask")
        builtList+=`<form class="hold" action="/completeTask" method="POST"><p>${task}</p><input type=submit name="id" value="${ID}" class="${className}"></input></form>`
    }
    console.log(builtList)
    res.status(200).send(builtList)}

module.exports={tasks,IID,buildList};