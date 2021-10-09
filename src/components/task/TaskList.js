import React, { useContext, useEffect, useState } from "react"
import { TaskContext } from "./TaskProvider"
import { TaskDetail } from "./TaskDetail"
import { useHistory } from "react-router-dom"
import Button from "react-bootstrap/Button"

export const TaskList = () => {
    const { tasks, getTasks, searchTerms } = useContext(TaskContext)

    const [filteredTasks, setFiltered] = useState([])
    const history = useHistory()

    // useEffect(() => {

    // }, [])

    useEffect(() => {
        getTasks()
        if (searchTerms !== "") {

            const subset = tasks.filter(task => task.lead.name.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            setFiltered(tasks)
        }
    }, [searchTerms, tasks])

    return (
        <>
            <h1>Tasks</h1>
            <div className="d-grid gap-2">
                <Button variant="dark" size="lg" className="newButton" onClick={() => history.push("/tasks/create")}>
                    Add New Task
                </Button>{' '}
            </div>
            <div className="tasks">
                {
                    filteredTasks.map(task => {
                        return <TaskDetail key={task.id} task={task} />
                    })
                }
            </div>
        </>
    )


}