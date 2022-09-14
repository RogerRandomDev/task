const express=require('express');
const app=express();
const {router}=require('./middleware/createTask')
const {buildList}=require('./data')
const {preload}=require('./controllers/controller')
const port = 3000;
//builds the list as html
app.get('/inputList', (req,res)=> {buildList("",res)})
//removal of items
app.use(express.text())
app.post("/removeTask",router)
app.post("/completeTask",router)
app.post("/addInput",router)


preload()
//static assets

app.use(express.static("./public"))

//parse form data

//parse json
app.use(express.json({json:true}))




//server
app.listen(port,()=>{
    console.log(`Server listening on ${port}`)
})
