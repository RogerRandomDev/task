const express=require('express');
const router=express.Router();
const {readTasks,createTask,completeTask,deleteTasks}= require('./middleware/taskreader');
router.route('/').get(readTasks)
router.route("/addInput").post(createTask)
router.route("/completeTask").post(completeTask)
router.route("/removeTask").post(deleteTasks)



module.exports = {router};