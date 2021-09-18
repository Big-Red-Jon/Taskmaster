import React, { useContext, useEffect, useState } from "react"
import { LeadContext } from "../lead/LeadProvider"
import { DocumentContext } from "./DocumentProvider"
import { useHistory, useParams } from 'react-router-dom';
// import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input/input'
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import NumberFormat from 'react-number-format';

export const DocumentForm = () => {
    const { addDocument, getDocById, updateDoc } = useContext(DocumentContext)
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

    // const [value, setValue] = useState()
    // const [callDate, setCallDate] = useState(new Date())
    // const [receiveDate, setReceiveDate] = useState(new Date())

    const [isLoading, setIsLoading] = useState(true);

    const { docId } = useParams();
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

    const saveDocument = () => {
        setIsLoading(true);
        if (docId) {
            updateDoc({
                id: parseInt(document.docId),
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

    useEffect(() => {
        if (docId) {
            getDocById(docId)
                .then(document => {
                    setDocument(document)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])

    return (

        <form className="doc--form" >
            <h2>Create New Document form</h2>
            <fieldset>
                <div>
                    <label htmlFor="leadId">Lead: </label> <br />
                    <select id="leadId" onChange={editInputChange} defaultValue={document.leadId}>
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
                    <label htmlFor="isLetterSent"> Pre-approval Letter Sent: </label>
                    <input type="checkbox" id="isLetterSent" checked={document.isLetterSent} onChange={editCheckChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="isPbSubmitted"> Paystubs Submitted: </label>
                    <input type="checkbox" id="isPbSubmitted" checked={document.isPbSubmitted} onChange={editCheckChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="isBkSubmitted"> Bank Statements Submitted: </label>
                    <input type="checkbox" id="isBkSubmitted" checked={document.isBkSubmitted} onChange={editCheckChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="isDLSubmitted"> Driver's License Submitted: </label>
                    <input type="checkbox" id="isDLSubmitted" checked={document.isDLSubmitted} onChange={editCheckChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="isSocialSubmitted"> Social Security Submitted: </label>
                    <input type="checkbox" id="isSocialSubmitted" checked={document.isSocialSubmitted} onChange={editCheckChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="isTaxSubmitted"> Tax Return Submitted: </label>
                    <input type="checkbox" id="isTaxSubmitted" checked={document.isTaxSubmitted} onChange={editCheckChange} />
                </div>
            </fieldset>
            <button
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault()
                    saveDocument()
                }}>
                {docId ? <>Save Documents</> : <>Add Documents</>}</button>
        </form>
    )

}