const express=require('express');
const app=express();
const {router}=require('./createTask')
const {buildList}=require('./data')
const port = 3000;
//builds the list as html
app.get('/inputList', (req,res)=> {buildList("",res)})
//removal of items
app.use(express.text())
app.post("/removeTask",router)
app.post("/completeTask",router)
app.post("/addInput",router)

//static assets

app.use(express.static("./public"))

//parse form data

//parse json
app.use(express.json({json:true}))




//server
app.listen(port,()=>{
    console.log(`Server listening on ${port}`)
})
