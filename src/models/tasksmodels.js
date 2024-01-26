const conection = require("./conection")

const getAll = async () => {
    const [tasks] = await conection.execute("SELECT * FROM tasks")
    return tasks
}

const createTask = async (tasks)=> {
    const { title } = tasks
    const dateUTC = new Date(Date.now()).toUTCString()

    const querry = "INSERT INTO tasks(title, status, created_at) VALUES (?, ?, ?)"

    const [createdTask] = await conection.execute(querry,[title, "pendente", dateUTC])
    return {insertId: createdTask.insertId}
}

const deleteTask = async (id) => {
    const [removedTask] = await conection.execute("DELETE FROM tasks WHERE id = ?",[id])
    return removedTask
}

const UpdateTask = async (id,task) => {
    const { title, status } = task
    const querry = "UPDATE tasks SET title = ?,status = ? WHERE id = ?"
    const [UpdateTask] = await conection.execute(querry, [title,status,id])
    return UpdateTask
}
module.exports = {
    getAll,
    createTask,
    deleteTask,
    UpdateTask,
}