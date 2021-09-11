import React, { useContext, useEffect, useState } from "react"
import { TaskContext } from "./TaskProvider"
import { TaskDetail } from "./TaskDetail"
import { useHistory } from "react-router-dom"

export const TaskList = () => {
    const { tasks, getTasks, searchTerms } = useContext(TaskContext)

    const [filteredTasks, setFiltered] = useState([])
    const history = useHistory()

    useEffect(() => {
        getTasks()
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {

            const subset = tasks.filter(task => task.task.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            setFiltered(tasks)
        }
    }, [searchTerms, tasks])

    return (
        <>
            <h1>Tasks</h1>
            <button onClick={() => history.push("/create")}>
                Add New Task
            </button>
            <div>
                {
                    filteredTasks.map(task => {
                        return <TaskDetail key={task.id} task={task} />
                    })
                }
            </div>
        </>
    )


}