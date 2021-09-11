import Reach, { useState, createContext } from "react"

export const TaskContext = createContext()
const URL = "http://localhost:8088"

// http://localhost:8088/tasks?_expand=leadId

export const TaskProvider = (props) => {
    const [tasks, setTasks] = useState([])
    const [searchTerms, setSearchTerms] = useState("")

    const getTasks = () => {
        return fetch(`${URL}/tasks?_expand=lead`)
            .then(res => res.json())
            .then(setTasks)
    }

    const addTask = taskSelect => {
        return fetch(`${URL}/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskSelect)
        })
            .then(getTasks)
    }

    const updateTask = task => {
        return fetch(`${URL}/tasks/${task.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        })
            .then(getTasks)
    }

    const deleteTask = taskId => {
        return fetch(`${URL}/tasks/${taskId}`, {
            method: "DELETE"
        })
            .then(getTasks)
    }

    const getTaskById = (taskId) => {
        return fetch(`${URL}/tasks/${taskId}
        `)
            .then(res => res.json())
    }

    return (
        <TaskContext.Provider value={{
            tasks, getTasks, addTask, updateTask, deleteTask, searchTerms, setSearchTerms, getTaskById
        }}>
            {props.children}
        </TaskContext.Provider>
    )

}