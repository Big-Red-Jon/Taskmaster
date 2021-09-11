import React, { useContext, useEffect, useState } from "react"
import { TaskContext } from "./TaskProvider"
import "./Task.css"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { PropertyTaxContext } from "../propertytax/PropertyTaxProvider"

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
            const thisTask = tasks.find(task => task.id === parseInt(taskId)) || { lead: {} }
            setTask(thisTask)
        }
    }, [taskId])


    return (
        <section>
            <h3>{task.leadId.name}</h3>
            <div>Task: {task.task} </div>
            <div>Due: {task.dueDate}</div>
            <div>Completed? {task.iscomplete ? "Yes" : "No"} </div>

            <button onClick={handleRelease}>Complete</button>

        </section>
    )
}
