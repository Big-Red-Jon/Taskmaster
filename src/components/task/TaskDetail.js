import React, { useContext, useEffect, useState } from "react"
import { TaskContext } from "./TaskProvider"
import "./Task.css"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"
// import { PropertyTaxContext } from "../propertytax/PropertyTaxProvider"

export const TaskDetail = (props) => {
    const { tasks } = useContext(TaskContext)
    const { deleteTask } = useContext(TaskContext)
    const [task, setTask] = useState(props.task || { lead: {} })

    const { taskId } = useParams();
    const history = useHistory()

    const handleRelease = () => {
        deleteTask(task.id)
            .then(() => {
                history.push("/")
            })
    }

    useEffect(() => {
        if (!props.task) {
            const thisTask = tasks.find(task => task.id === parseInt(taskId)) || { task: {} }
            setTask(thisTask)
        }
    }, [taskId])


    return (
        <section className="task" >
            <h3>{task.lead.name}</h3>
            <div>Task: {task.task} </div>
            <div>Due: {task.dueDate}</div>

            <div>Completed? {task.isComplete ? "Yes" : "No"} </div>


            <button onClick={handleRelease}>Delete</button>
            <button onClick={() => {
                history.push(`/tasks/edit/${task.id}`)
            }}>Update Task</button>

        </section >
    )
}


