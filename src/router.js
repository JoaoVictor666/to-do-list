const express = require("express")
const taskscontroller = require("./controllers/taskscontroller")
const tasksmiddleware = require("./middlewares/tasksmiddleware")
const router = express.Router()

router.get ("/tasks", taskscontroller.getAll)
router.post("/tasks", tasksmiddleware.validateTitle, taskscontroller.createTask);

router.delete (`/tasks/:id`, taskscontroller.deleteTask)
router.put (`/tasks/:id`, tasksmiddleware.validateFieldStatus, taskscontroller. UpdateTask)

module.exports = router
