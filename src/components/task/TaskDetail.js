import React, { useContext, useEffect, useState } from "react"
import { TaskContext } from "./TaskProvider"
import "./Task.css"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"
import Card from 'react-bootstrap/Card';
import { ButtonGroup } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import { ListGroup } from "react-bootstrap"
import ListGroupItem from "react-bootstrap/ListGroupItem"
// import Collapse from 'react-bootstrap/Collapse'
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
            <Card>
                <Card.Body>
                    <Card.Title>{task.lead.name}</Card.Title>
                    <Card.Subtitle>{task.task} </Card.Subtitle>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>Due: {task.dueDate}</ListGroupItem>
                        <ListGroupItem>Completed? {task.isComplete ? "Yes" : "No"}</ListGroupItem>
                        <ButtonGroup aria-label="Basic example">
                            <Button variant="secondary" onClick={handleRelease}>
                                Delete
                            </Button>
                            <Button variant="secondary" onClick={() => {
                                history.push(`/tasks/edit/${task.id}`)
                            }}>
                                Update
                            </Button>
                        </ButtonGroup>
                    </ListGroup>
                </Card.Body>
            </Card>
        </section >
    )
}


