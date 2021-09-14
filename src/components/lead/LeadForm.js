import React, { useContext, useEffect, useState } from "react"
import { LeadContext } from "./LeadProvider"
import { RealtorContext } from "../realtor/RealtorProvider";
import "./Lead.css"
import { useHistory, useParams } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input/input'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const LeadForm = () => {
    const { addLead, getLeadById, updateLead } = useContext(LeadContext)
    const { realtors, getRealtors } = useContext(RealtorContext)
    const [lead, setLead] = useState({
        id: 0,
        name: "",
        email: "",
        preferredContact: "",
        notes: "",
        realtorId: 0,
        isPreapproved: false,
        docsComplete: false,
        lpId: 0,
        docsId: 0,
        underContract: false,
        isApptSet: false
    })

    const [value, setValue] = useState()
    const [callDate, setCallDate] = useState(new Date())
    const [receiveDate, setReceiveDate] = useState(new Date())

    const [isLoading, setIsLoading] = useState(true);

    const { leadId } = useParams();
    const history = useHistory();

    const editCheckChange = (event) => {
        const newLead = { ...lead }
        newLead[event.target.id] = event.target.checked
        setLead(newLead)
    }

    const editInputChange = (event) => {
        const newLead = { ...lead }
        newLead[event.target.id] = event.target.value
        setLead(newLead)
    }

    useEffect(() => {
        getRealtors()
    }, [])

    const saveLead = () => {
        setIsLoading(true);
        if (leadId) {
            updateLead({
                id: parseInt(leadId),
                name: lead.name,
                email: lead.email,
                phone: value,
                preferredContact: lead.preferredContact,
                notes: lead.notes,
                realtorId: parseInt(lead.realtorId),
                dateLastCalled: lead.dateLastCalled,
                dateLastCalled: callDate,
                dateReceived: receiveDate,
                isPreapproved: lead.isPreapproved,
                docsComplete: lead.docsComplete,
                lpId: 1,
                docId: lead.docsId,
                underContract: lead.underContract,
                isApptSet: lead.isApptSet,

            })
                .then(() => history.push(`/leads`))
        } else {
            addLead({
                name: lead.name,
                email: lead.email,
                phone: value,
                preferredContact: lead.preferredContact,
                notes: lead.notes,
                realtorId: parseInt(lead.realtorId),
                dateLastCalled: callDate,
                dateReceived: receiveDate,
                isPreapproved: lead.isPreapproved,
                docsComplete: lead.docsComplete,
                lpId: 1,
                underContract: lead.underContract,
                isApptSet: lead.isApptSet
            })
                .then(() => history.push(`/leads`))
        }

    }

    useEffect(() => {
        if (leadId) {
            getLeadById(leadId)
                .then(lead => {
                    setLead(lead)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])

    return (

        <form className="lead--form" >
            <h2>Add New Lead</h2>
            <fieldset>
                <div>
                    <label htmlFor="name">Name</label><br />
                    <input className="form--item" type="text" id="name" name="name" required autoFocus
                        placeholder="Lead Name"
                        onChange={editInputChange}
                        defaultValue={lead.name} />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="email">Email:</label><br />
                    <input className="form--item" type="text" id="email" name="email" required autoFocus
                        placeholder="Lead Email"
                        onChange={editInputChange}
                        defaultValue={lead.email} />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="phone">Phone:</label><br />
                    <PhoneInput maxLength="16" country="US" className="form--item" id="phone" name="phone" required autoFocus
                        placeholder="Enter phone number"
                        value={value}
                        onChange={setValue}
                        defaultValue={value} />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="preferredContact">Preferred Method of Contact</label> < br />
                    <select name="preferredContact" id="preferredContact" onChange={editInputChange}
                        defaultValue={lead.email} >
                        <option value="Email">Email</option>
                        <option value="Phone">Phone</option>
                        <option value="Text">Text</option>
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="notes">Notes: <br />
                        <textarea className="form--item" type="text" id="notes" name="notes" required autoFocus
                            placeholder="Notes on Lead"
                            onChange={editInputChange}
                            defaultValue={lead.notes} />
                    </label>
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="realtorId">Realtor: </label> <br />
                    <select id="realtorId" onChange={editInputChange} defaultValue={lead.realtorId}>
                        {realtors.map(realtor => (
                            <option
                                key={realtor.id}
                                value={realtor.id}
                            >
                                {realtor.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset><br />
            <fieldset>
                <div className="form-group">
                    <label htmlFor="dateLastCalled"> Date Last Called: </label>
                    <DatePicker id="dateLastCalled" selected={callDate} onChange={(date) => setCallDate(date)} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="dateReceived"> Date Received: </label>
                    <DatePicker id="dateReceived" selected={receiveDate} onChange={(date) => setReceiveDate(date)} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="isApproved"> Client Preapproved: </label>
                    <input type="checkbox" id="isPreapproved" checked={lead.isPreapproved} onChange={editCheckChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="underContract"> Client Under Contract: </label>
                    <input type="checkbox" id="underContract" checked={lead.underContract} onChange={editCheckChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="isApptSet"> Appointment Set: </label>
                    <input type="checkbox" id="isApptSet" checked={lead.isApptSet} onChange={editCheckChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="docsComplete"> All Docs Submitted: </label>
                    <input type="checkbox" id="docsComplete" checked={lead.docsComplete} onChange={editCheckChange} />
                </div>
            </fieldset>
            <button
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault()
                    saveLead()
                }}>
                {leadId ? <>Save Lead</> : <>Add Lead</>}</button>
        </form>
    )

}