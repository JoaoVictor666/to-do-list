
const tbody = document.querySelector("tbody")
const addForm = document.querySelector(".add-form")
const inputTask = document.querySelector(".input-task")


//chamada da API backend
const fetchTasks = async () => {
   const response = await fetch("http://localhost:3333/tasks")
   const tasks = await response.json()
   return tasks

} 


// adiciona uma nova task no banco de dados
const addTask = async (event) => {
    event.preventDefault()


    const task = { title: inputTask.value}
    await fetch("http://localhost:3333/tasks", {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(task),
    }) 

    loadTasks()
    inputTask.value = ""
}


// deleta uma task do banco de dados 
const deleteTask = async (id) => {
   
    await fetch(`http://localhost:3333/tasks/${id}`, {
        method: "delete",
    })
    loadTasks()
}

// salva as tasks modificados no banco de dados
const updateTask = async ({ id, title, status }) => {
    await fetch(`http://localhost:3333/tasks/${id}`, {
        mettbodyhod: "put",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({title,status}),
    })
    loadTasks()
}


// Formatasao dos dados da Data de como sera exibido para o usuario
const formateDate = (dateUTC) => {
    const option = { dateStyle: "long", timeStyle: "short"}
    const date = new Date(dateUTC).toLocaleString("pt-br",option)
    return date
}

//  facilita ao criar elemeto HTML td
const createElement = (tag, innerText = "",innerHTML) => {
    const element = document.createElement(tag)
    if (innerText) {
        element.innerText = innerText
    }
    if (innerHTML) {
        element.innerHTML = innerHTML
    }
    return element
}

// criar slelect HTML. As opsao serao as mesmas entao posso passar em forma de texto
const createSelect = (value) => {
    const option = 
    `<option value="pendente">Pendente</option>
    <option value="em andamento">Em Andamento</option>
    <option value="comcluido">Comcluido</option>`
    const select = createElement('select',"",option )
    select.value = value

    return select
    
}

// criar row que esta sendo adicionada a tabela
const createRow = (task) => {
    const { id, title, created_at, status } = task

    const tr = createElement("tr")

    const tdTitle = createElement("td", title)
    const tdCreated_at = createElement("td", formateDate(created_at))
    const tdStatus = createElement("td")
    const tdActions = createElement("td")

    const select = createSelect(status)
    select.addEventListener("change",({ target }) => updateTask({...task,status: target.value}))

    const editButton = createElement("button", "", '<span class="material-symbols-outlined">edit</span>')
    const deleteButton = createElement("button", "", ' <span class="material-symbols-outlined">delete</span>')
    
    const editForm = createElement("form")
    const editInput = createElement("input")


    editInput.value = title
    editForm.appendChild(editInput)


    editForm.addEventListener("submit", (event) => {
        event.preventDefault()
        updateTask({id,title: editInput.value, status})
    })


    editButton.classList.add("btn-action")


    editButton.addEventListener("click", () => {
        tdTitle.innerText = ""
        tdTitle.appendChild(editForm)
    })


    deleteButton.classList.add("btn-action")


    deleteButton.addEventListener("click", () => deleteTask(id))


    tdStatus.appendChild(select)
    tdActions.appendChild(editButton)
    tdActions.appendChild(deleteButton)
    


    let taskrow = [tdTitle, tdCreated_at, tdStatus, tdActions]
    // Adiciona as células à linha
    taskrow.forEach(element => {
        tr.appendChild(element)
    })


   return tr
}


// recarega a pagina
const loadTasks = async () =>  {
    const tasks = await fetchTasks()

    tbody.innerHTML = ""

    tasks.forEach((task)=> {
        const tr = createRow(task)

        // Adiciona a linha ao corpo da tabela
        tbody.appendChild(tr)
    })
}

addForm.addEventListener("submit", addTask)

loadTasks()

    