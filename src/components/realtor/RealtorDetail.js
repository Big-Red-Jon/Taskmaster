import React, { useContext, useEffect, useState } from "react"
import { RealtorContext } from "./RealtorProvider"
import "./Realtor.css"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { formatPhoneNumber } from 'react-phone-number-input'
import Card from 'react-bootstrap/Card';
import { ButtonGroup } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import { ListGroup } from "react-bootstrap"
import ListGroupItem from "react-bootstrap/ListGroupItem"
import Collapse from 'react-bootstrap/Collapse'

export const RealtorDetail = (props) => {
    const { realtors, deleteRealtor } = useContext(RealtorContext)
    const [realtor, setRealtor] = useState(props.realtor || { realtor: {} })
    const { realtorId } = useParams();
    const history = useHistory()
    const handleRelease = () => {
        deleteRealtor(realtor.id)
            .then(() => {
                history.push("/realtors")
            })
    }

    useEffect(() => {
        if (!props.realtor) {
            const thisRealtor = realtors.find(realtor => realtor.id === parseInt(realtorId))
            setRealtor(thisRealtor)
        }
    }, [realtorId])

    return (
        <section className="realtor">

            <Card style={{ width: '25rem' }}>
                <Card.Body>
                    <Card.Title>{realtor.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text"> {realtor.office}</Card.Subtitle>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>Phone: {formatPhoneNumber(realtor.phone)}</ListGroupItem>
                        <ListGroupItem>Email: {realtor.email}</ListGroupItem>
                        <ListGroupItem>Date Last Called: {realtor.dateLastCalled}</ListGroupItem>
                    </ListGroup>
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="secondary" onClick={() => {
                            history.push(`/realtors/edit/${realtor.id}`)
                        }}>Edit</Button>
                        <Button variant="secondary" onClick={handleRelease}>Delete</Button>
                    </ButtonGroup>

                </Card.Body>
            </Card>

        </section>
    )
}

{/* <h4>{realtor.name}</h4>
            <div>Phone: {formatPhoneNumber(realtor.phone)}</div>
            <div>Email: {realtor.email}</div>
            <div>Agency: {realtor.office}</div>
            <div>Last Contact: {realtor.dateLastCalled}</div>

            <button onClick={handleRelease}>Delete Realtor </button>
            <button onClick={() => {
                history.push(`/realtors/edit/${realtor.id}`)
            }}>Update Agent</button> */}