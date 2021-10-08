import React, { useContext, useEffect, useState } from "react"
import { LeadContext } from "./LeadProvider"
import "./Lead.css"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { DocumentContext } from "../documents/DocumentProvider"
import { formatPhoneNumber } from 'react-phone-number-input'
import Card from 'react-bootstrap/Card';
import { ButtonGroup } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import { ListGroup } from "react-bootstrap"
import ListGroupItem from "react-bootstrap/ListGroupItem"
import Collapse from 'react-bootstrap/Collapse'

export const LeadDetail = (props) => {
    const { leads, deleteLead } = useContext(LeadContext)
    const [lead, setLead] = useState(props.lead || { loanPartner: {} })
    const { getDocuments } = useContext(DocumentContext)
    const { leadId } = useParams();
    const history = useHistory()

    const handleRelease = () => {
        deleteLead(lead.id)
            .then(() => {
                history.push("/leads")
            })
    }

    useEffect(() => {
        getDocuments()
        console.log(props);
        if (!props.lead) {
            const thisLead = leads.find(lead => lead.id === parseInt(leadId)) || { loanPartner: {} }
            setLead(thisLead)
        }
    }, [leadId])

    const [open, setOpen] = useState(false);


    return (
        <section className="lead">
            < Card className="lead-card" style={{ width: '25rem' }}>
                <Card.Body>
                    <Card.Title className="Lead-Name">{lead.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text">Realtor: {lead.realtor.name} from {lead.realtor.office}</Card.Subtitle>
                    <Button
                        className="button"
                        onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                        variant="light"
                    >
                        See Lead Notes
                    </Button>
                    <Collapse in={open}>
                        <div id="example-collapse-text">
                            <Card.Text>
                                {lead.notes}
                            </Card.Text>
                        </div>
                    </Collapse>

                    <ListGroup className="list-group-flush">
                        <ListGroupItem>Phone: {formatPhoneNumber(lead.phone)}</ListGroupItem>
                        <ListGroupItem>Email: {lead.email}</ListGroupItem>
                        <ListGroupItem>Date Last Called: {lead.dateLastCalled}</ListGroupItem>
                    </ListGroup>
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="secondary" onClick={() => {
                            history.push(`/documents/detail/${lead.id}`)
                        }} >Docs</Button>
                        <Button variant="secondary" onClick={() => {
                            history.push(`/leads/edit/${lead.id}`)
                        }}>Edit</Button>
                        <Button variant="secondary" onClick={handleRelease}>Delete</Button>
                    </ButtonGroup>
                </Card.Body>
            </Card >
        </section>
    )
}