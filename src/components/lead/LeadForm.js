import React, { useContext, useEffect, useState } from "react"
import { LeadContext } from "./LeadProvider"
import { RealtorContext } from "../realtor/RealtorProvider";
import "./Lead.css"
import { useHistory, useParams } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input/input'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import NumberFormat from 'react-number-format';

import moment from "moment";

export const LeadForm = () => {
    const { addLead, getLeadById, updateLead } = useContext(LeadContext)
    const { realtors, getRealtors } = useContext(RealtorContext)
    const [lead, setLead] = useState({
        id: 0,
        name: "",
        email: "",
        phone: "",
        preferredContact: "",
        notes: "",
        realtorId: 0,
        dateLastCalled: "",
        dateReceived: "",
        isPreapproved: false,
        docsComplete: false,
        lpId: 0,
        underContract: false,
        isApptSet: false
    })

    const FORMAT = "MM/dd/yyyy"
    const [value, setValue] = useState("")
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

    useEffect(() => {
        if (leadId) {
            getLeadById(leadId)
                .then(lead => {
                    setLead(lead)
                    setCallDate(Date.parse(lead.dateLastCalled.substring(0, 10).replace("-", "/")))
                    setReceiveDate(Date.parse(lead.dateReceived.substring(0, 10).replace("-", "/")))
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])

    // const dateChoice = Date.parse(lead.dateLastCalled.substring(0, 10).replace("-", "/"))


    const saveLead = () => {
        setIsLoading(true);
        if (leadId) {
            updateLead({
                id: parseInt(leadId),
                name: lead.name,
                email: lead.email,
                phone: value || lead.phone,
                preferredContact: lead.preferredContact,
                notes: lead.notes,
                realtorId: parseInt(lead.realtorId),
                dateLastCalled: callDate || lead.dateLastCalled,
                dateReceived: receiveDate || lead.dateReceived,
                isPreapproved: lead.isPreapproved,
                docsComplete: lead.docsComplete,
                lpId: 1,
                // docId: lead.docsId,
                underContract: lead.underContract,
                isApptSet: lead.isApptSet,

            })
                .then(() => history.push(`/leads`))
        } else {
            addLead({
                name: lead.name,
                email: lead.email,
                phone: value || lead.phone,
                preferredContact: lead.preferredContact,
                notes: lead.notes,
                realtorId: parseInt(lead.realtorId),
                dateLastCalled: callDate || lead.dateLastCalled,
                dateReceived: receiveDate || lead.dateReceived,
                isPreapproved: lead.isPreapproved,
                docsComplete: lead.docsComplete,
                lpId: 1,
                underContract: lead.underContract,
                isApptSet: lead.isApptSet
            })
                .then(() => history.push(`/leads`))
        }

    }


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
                <div >
                    <label htmlFor="phone">Phone:</label><br />
                    <PhoneInput country="US" className="form--item" id="phone" name="phone" required autoFocus
                        placeholder="Enter phone number"
                        value={lead.phone || value}
                        onChange={setValue}
                        defaultValue={lead.phone}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="preferredContact">Preferred Method of Contact</label> < br />
                    <select name="preferredContact" className="form--item" id="preferredContact" onChange={editInputChange}
                        defaultValue={lead.preferredContact} >
                        <option value="Email">Email</option>
                        <option value="Phone">Phone</option>
                        <option value="Text">Text</option>
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="notes">Notes: <br />
                        <textarea type="text" id="notes" name="notes" required autoFocus
                            placeholder="Notes on Lead"
                            onChange={editInputChange}
                            defaultValue={lead.notes} />
                    </label>
                </div>
            </fieldset>
            <fieldset>
                <div>
                    {/* <option value="" disabled selected>Select your option</option> */}
                    <label htmlFor="realtorId">Realtor: </label> <br />
                    <select id="realtorId" className="form--item" onChange={editInputChange} defaultValue={parseInt(lead.realtorId)}>
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
                    <DatePicker className="form--item" id="dateLastCalled" dateFormat={FORMAT} selected={callDate} onChange={(FORMAT) => setCallDate(FORMAT)} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="dateReceived"> Date Received: </label>
                    <DatePicker className="form--item" id="dateReceived" dateFormat={FORMAT} selected={receiveDate} onChange={(FORMAT) => setReceiveDate(FORMAT)} />
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