const { request, response } = require("express")
const tasksmodels = require("../models/tasksmodels")

const getAll = async (resquest,response) => {
    const tasks = await tasksmodels.getAll()
    return response.status(200).json(tasks)
}
const createTask = async (request, response) => {
    const createdTask = await tasksmodels.createTask(request.body)
    return response.status(201).json(createdTask)
}

const deleteTask = async (request, response) => {
    const { id } = request.params
    await tasksmodels.deleteTask(id)
    return response.status(204).json()
}  

const UpdateTask = async (request, response) => {
    const { id } = request.params
    await tasksmodels.UpdateTask(id, request.body)
    return response.status(204).json()
}
module.exports = {
    getAll,
    createTask,
    deleteTask,
    UpdateTask,
}

