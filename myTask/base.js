const express=require('express');
const app=express();
const {router, del}=require('./createTask')

const {tasks}=require('./middleware/taskreader')
const {buildList}=require('./data')
const port = 3000;
//builds the list as html
app.get('/inputList', (req,res)=> {
    buildList("",res)
})


//static assets

app.use(express.static("./public"))

//parse form data
app.use(express.urlencoded({extended:false}))
//parse json
app.use(express.json({json:true}))

//removal of items
app.use("/completeTask",router)
app.use("/addInput",router)
app.use('/removeTasks',del)



//server
app.listen(port,()=>{
    console.log(`Server listening on ${port}`)
})
