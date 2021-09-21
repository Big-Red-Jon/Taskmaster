import React, { useContext, useEffect, useState } from "react"
import { TaskContext } from "./TaskProvider"
import { LeadContext } from "../lead/LeadProvider";
import "./Task.css"
import { useHistory, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const TaskForm = () => {
    const { addTask, getTaskById, updateTask } = useContext(TaskContext)
    const { leads, getLeads } = useContext(LeadContext)
    const [task, setTask] = useState({})

    const [dueDate, setDueDate] = useState(new Date())

    const [isLoading, setIsLoading] = useState(true);
    const { taskId } = useParams();
    const history = useHistory();

    const editInputChange = (event) => {
        const newTask = { ...task }
        newTask[event.target.id] = event.target.value
        setTask(newTask)
    }

    const editCheckChange = (event) => {
        const newTask = { ...task }
        newTask[event.target.id] = event.target.checked
        setTask(newTask)
    }

    useEffect(() => {
        getLeads()
    }, [])


    const saveTask = () => {
        setIsLoading(true);
        if (taskId) {
            updateTask({
                id: parseInt(taskId),
                task: task.task,
                leadId: parseInt(task.leadId),
                dueDate: dueDate,
                isComplete: task.isComplete

            })
                .then(() => history.push(`/`))
        } else {
            addTask({
                task: task.task,
                leadId: parseInt(task.leadId),
                dueDate: dueDate || task.dueDate,
                isComplete: task.isComplete

            })
                .then(() => history.push(`/`))
        }

    }

    useEffect(() => {
        if (taskId) {
            getTaskById(taskId)
                .then(task => {
                    setTask(task)
                    setDueDate(Date.parse(task.dueDate.substring(0, 10).replace("-", "/")))
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
                    <label htmlFor="leadId">Lead Assigned: </label> <br />
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
            {/* <fieldset>
                <div>
                    <label htmlFor="loanPartner">Lead Assigned: </label> <br />
                    <select id="loanPartner" onChange={editInputChange} defaultValue={loanPartner.leadId}>
                        {loanPartners.map(loanPartner => (
                            <option
                                key={loanPartner.id}
                                value={loanPartner.id}
                            >
                                {loanPartner.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset> */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="dueDate"> Date Last Called: </label>
                    <DatePicker id="dueDate" selected={dueDate} onChange={(date) => setDueDate(date)} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="isComplete">Complete?</label><br />
                    <input type="checkbox" id="isComplete" name="isComplete" checked={task.isComplete} onChange={editCheckChange} />
                </div>
            </fieldset>
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