const express=require('express');
const router=express.Router();
const {readTasks,createTask,completeTask}= require('./middleware/taskreader');
router.route('/completeTask/:id').put(completeTask)
router.route('/').get(readTasks).post(createTask)

module.exports = router;