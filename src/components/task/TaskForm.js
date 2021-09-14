import React, { useContext, useEffect, useState } from "react"
import { TaskContext } from "./TaskProvider"
import { LeadContext } from "../lead/LeadProvider";
import "./Task.css"
import { useHistory, useParams } from 'react-router-dom';

export const TaskForm = () => {
    const { addTask, getTaskById, updateTask } = useContext(TaskContext)
    const { leads, getLeads } = useContext(LeadContext)
    const [task, setTask] = useState({})

    const [isLoading, setIsLoading] = useState(true);
    const { taskId } = useParams();
    const history = useHistory();

    const editInputChange = (event) => {
        const newTask = { ...task }
        newTask[event.target.id] = event.target.value
        setTask(newTask)
    }

    const toggleCheckedObject = () => setTask({
        ...task,
        completed: !task.isComplete
    });

    useEffect(() => {
        getLeads()
    }, [])

    const saveTask = () => {
        setIsLoading(true);
        if (taskId) {
            updateTask({
                id: parseInt(taskId),
                task: task.name,
                leadId: parseInt(task.leadId),
                dueDate: task.dueDate,
                isComplete: false

            })
                .then(() => history.push(`/tasks`))
        } else {
            addTask({
                task: task.task,
                leadId: parseInt(task.leadId),
                dueDate: task.dueDate,
                isComplete: false

            })
                .then(() => history.push(`/tasks`))
        }

    }

    useEffect(() => {
        if (taskId) {
            getTaskById(taskId)
                .then(task => {
                    setTask(task)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])


    return (

        <form className="task--form" >
            <h2>Task Form</h2>
            <fieldset>
                <div>
                    <label htmlFor="task">Task</label><br />
                    <input className="form--item" type="text" id="task" name="task" required autoFocus
                        placeholder="Task Description"
                        onChange={editInputChange}
                        defaultValue={task.task} />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="realtorId">Lead Assigned: </label> <br />
                    <select id="leadId" onChange={editInputChange} defaultValue={task.leadId}>
                        {leads.map(lead => (
                            <option
                                key={lead.id}
                                value={lead.id}
                            >
                                {lead.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="dueDate">Due Date:</label><br />
                    <input className="form--item" type="text" id="dueDate" name="dueDate" required autoFocus

                        onChange={editInputChange}
                        defaultValue={task.dueDate} />
                </div>
            </fieldset> <br />
            <button
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault()
                    saveTask()
                }}>
                {taskId ? <>Save Task</> : <>Add Task</>}</button>
        </form>
    )

}