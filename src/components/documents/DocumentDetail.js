import React, { useContext, useEffect, useState } from "react"
import { DocumentContext } from "./DocumentProvider"
import "./Document.css"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { LeadContext } from "../lead/LeadProvider"
import Card from 'react-bootstrap/Card';
import { ButtonGroup } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import { ListGroup } from "react-bootstrap"
import ListGroupItem from "react-bootstrap/ListGroupItem"

export const DocumentDetail = (props) => {
    const { documents, getDocuments, deleteDocument } = useContext(DocumentContext)
    const { getLeads } = useContext(LeadContext)
    const [document, setDocument] = useState(props.document || { lead: {} })
    const { documentId } = useParams();
    const history = useHistory()

    const handleRelease = () => {
        deleteDocument(document.id)
            .then(() => {
                history.push("/documents")
            })
    }
    useEffect(() => {
        getDocuments().then(getLeads())
    }, [])



    useEffect(() => {
        if (!props.document) {
            const thisDocument = documents.find(document => document.id === parseInt(documentId)) || {
                lead: {}
            }
            setDocument(thisDocument)
        }
    }, [documentId])

    return (
        < Card className="documents" style={{ width: '100%' }}>
            <Card.Body>
                <Card.Title className="Doc-Name">{document.lead.name}</Card.Title>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Taxes Received? {document.isTaxSubmitted ? "Yes" : "No"}</ListGroupItem>
                    <ListGroupItem>Paystubs Received? {document.isPbSubmitted ? "Yes" : "No"}</ListGroupItem>
                    <ListGroupItem>Bank Statement Received? {document.isBkSubmitted ? "Yes" : "No"}</ListGroupItem>
                    <ListGroupItem>ID Received? {document.isDLSubmitted ? "Yes" : "No"}</ListGroupItem>
                    <ListGroupItem>Social Security Received? {document.isSocialSubmitted ? "Yes" : "No"}</ListGroupItem>
                    <ListGroupItem>Pre-approval Letter Sent? {document.isLetterSent ? "Yes" : "No"}</ListGroupItem>
                </ListGroup>
                <br />
                <ButtonGroup aria-label="Basic example">
                    <Button variant="secondary" onClick={() => {
                        history.push(`/leads`)
                    }} >Return</Button>
                    <Button variant="secondary" onClick={() => {
                        history.push(`/documents/edit/${document.id}`)
                    }}>Edit</Button>
                    <Button variant="secondary" onClick={handleRelease}>Delete List</Button>
                </ButtonGroup>

            </Card.Body>
        </Card>
    )
}

{/* <ButtonGroup aria-label="Basic example">
    <Button variant="secondary" onClick={() => {
        history.push(`/leads`)
    }} >Return</Button>
    <Button variant="secondary" onClick={() => {
        history.push(`/documents/edit/${document.id}`)
    }}>Edit</Button>
    <Button variant="secondary" onClick={handleRelease}>Delete List</Button>
</ButtonGroup> */}

{/* <section className="document">
                <h4>{document.lead.name} Documentation Checklist</h4>
                <div>Taxes Received? {document.isTaxSubmitted ? "Yes" : "No"}</div>
                <div>Paystubs Received? {document.isPbSubmitted ? "Yes" : "No"}</div>
                <div>Bank Statement Received? {document.isBkSubmitted ? "Yes" : "No"}</div>
                <div>ID Received? {document.isDLSubmitted ? "Yes" : "No"}</div>
                <div>Social Security Received? {document.isSocialSubmitted ? "Yes" : "No"}</div>
                <div>Pre-approval Letter Sent? {document.isLetterSent ? "Yes" : "No"}</div>

                <button onClick={handleRelease}>Delete List </button>
                <button onClick={() => {
                    history.push(`/documents/edit/${document.id}`)
                }}>Update Document List</button>
            </section> */}