import React, { useContext, useEffect, useState } from "react"
import { DocumentContext } from "./DocumentProvider"
import "./Document.css"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"

export const DocumentDetail = (props) => {
    const { documents } = useContext(DocumentContext)
    const { deleteDocument } = useContext(DocumentContext)
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
        if (!props.document) {
            const thisDocument = documents.find(document => document.id === parseInt(documentId)) || { lead: {} }
            setDocument(thisDocument)
        }
    }, [documentId])

    return (
        <section className="document">
            <h4>{document.lead.name}</h4>
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
        </section>
    )




}

