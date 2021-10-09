import React, { useContext, useEffect, useState } from "react"
import { LeadContext } from "../lead/LeadProvider"
import { DocumentContext } from "./DocumentProvider"
import { useHistory, useParams } from 'react-router-dom';
import Button from "react-bootstrap/Button"

export const DocumentForm = () => {
    const { addDocument, getDocById, updateDocument } = useContext(DocumentContext)
    const { leads, getLeads } = useContext(LeadContext)
    const [document, setDocument] = useState({
        id: 0,
        leadId: 0,
        isLetterSent: false,
        isPbSubmitted: false,
        isBkSubmitted: false,
        isDLSubmitted: false,
        isSocialSubmitted: false,
        isTaxSubmitted: false
    })


    const [isLoading, setIsLoading] = useState(true);

    const { documentId } = useParams();
    const history = useHistory();

    const editCheckChange = (event) => {
        const newDoc = { ...document }
        newDoc[event.target.id] = event.target.checked
        setDocument(newDoc)
    }

    const editInputChange = (event) => {
        const newDoc = { ...document }
        newDoc[event.target.id] = event.target.value
        setDocument(newDoc)
    }

    useEffect(() => {
        getLeads()

    }, [])


    // useEffect(() => {
    //     getDocuments()
    //     console.log(props);
    //     if (!props.lead) {
    //         const thisLead = leads.find(lead => lead.id === parseInt(leadId)) || { loanPartner: {} }
    //         setLead(thisLead)
    //     }
    // }, [leadId])

    useEffect(() => {
        if (documentId) {
            getDocById(documentId)
                .then(document => {
                    setDocument(document)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])

    const saveDocument = () => {
        setIsLoading(true);
        if (documentId) {
            updateDocument({
                id: parseInt(documentId),
                leadId: parseInt(document.leadId),
                isLetterSent: document.isLetterSent,
                isPbSubmitted: document.isPbSubmitted,
                isBkSubmitted: document.isBkSubmitted,
                isDLSubmitted: document.isDLSubmitted,
                isSocialSubmitted: document.isSocialSubmitted,
                isTaxSubmitted: document.isTaxSubmitted

            })
                .then(() => history.push(`/documents`))
        } else {
            addDocument({
                leadId: parseInt(document.leadId),
                isLetterSent: document.isLetterSent,
                isPbSubmitted: document.isPbSubmitted,
                isBkSubmitted: document.isBkSubmitted,
                isDLSubmitted: document.isDLSubmitted,
                isSocialSubmitted: document.isSocialSubmitted,
                isTaxSubmitted: document.isTaxSubmitted
            })
                .then(() => history.push(`/documents`))
        }

    }

    return (

        <form className="doc--form" >
            <h2>{document.id ? <>Edit Documents</> : <>Add New Document Form</>}</h2>
            <fieldset>
                <div>
                    <label htmlFor="leadId">Lead: </label> <br />
                    <select className="form--item" id="leadId" onChange={editInputChange} value={document.leadId} defaultValue={document.leadId}>
                        <option>Select Lead</option>
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
            </fieldset><br />
            <fieldset>
                <div className="form-group">
                    <input className="check-item" type="checkbox" id="isLetterSent" checked={document.isLetterSent} onChange={editCheckChange} />
                    <label htmlFor="isLetterSent"> Pre-approval Letter Sent: </label>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <input className="check-item" type="checkbox" id="isPbSubmitted" checked={document.isPbSubmitted} onChange={editCheckChange} />
                    <label htmlFor="isPbSubmitted"> Paystubs Submitted: </label>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <input className="check-item" type="checkbox" id="isBkSubmitted" checked={document.isBkSubmitted} onChange={editCheckChange} />
                    <label htmlFor="isBkSubmitted"> Bank Statements Submitted: </label>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <input className="check-item" type="checkbox" id="isDLSubmitted" checked={document.isDLSubmitted} onChange={editCheckChange} />
                    <label htmlFor="isDLSubmitted"> Driver's License Submitted: </label>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <input className="check-item" type="checkbox" id="isSocialSubmitted" checked={document.isSocialSubmitted} onChange={editCheckChange} />
                    <label htmlFor="isSocialSubmitted"> Social Security Submitted: </label>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <input className="check-item" type="checkbox" id="isTaxSubmitted" checked={document.isTaxSubmitted} onChange={editCheckChange} />
                    <label htmlFor="isTaxSubmitted"> Tax Return Submitted: </label>
                </div>
            </fieldset>
            <br />
            <Button variant="primary" size="lg"
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault()
                    saveDocument()
                }}>
                {documentId ? <>Save Documents</> : <>Add Documents</>}</Button>{' '}
        </form>
    )

}