const express=require('express');
const router=express.Router();
const del=express.Router()
const {readTasks,createTask,completeTask,deleteTasks}= require('./middleware/taskreader');
del.route('/removeTasks').delete(deleteTasks)
router.route('/completeTask/:id').put(completeTask)
router.route('/').get(readTasks).post(createTask)

module.exports = {router,del};