import React, { useContext, useEffect, useState } from "react"
import { LeadContext } from "./LeadProvider"
import { RealtorContext } from "../realtor/RealtorProvider";
import "./Lead.css"
import { useHistory, useParams } from 'react-router-dom';

export const LeadForm = () => {
    const { addLead, getLeadById, updateLead } = useContext(LeadContext)
    const { realtors, getRealtors } = useContext(RealtorContext)
    const [lead, setLead] = useState({})

    const [isLoading, setIsLoading] = useState(true);

    const { leadId } = useParams();
    const history = useHistory();

    const toggleCheckedObject = () => setLead({
        ...lead,
        completed: !lead.isApptSet
    });

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
                phone: lead.phone,
                preferredContact: lead.preferredContact,
                notes: lead.notes,
                realtorId: parseInt(lead.realtorId),
                dateLastCalled: lead.dateLastCalled,
                dateReceived: lead.dateReceived,
                isPreapproved: lead.isPreapproved,
                docsComplete: lead.docsComplete,
                lpId: lead.lpId,
                docId: lead.docsId,
                underContract: lead.underContract,
                isApptSet: lead.isApptSet,

            })
                .then(() => history.push(`/leads`))
        } else {
            addLead({
                // userId: parseInt(userId),
                name: lead.name,
                email: lead.email,
                phone: lead.phone,
                preferredContact: lead.preferredContact,
                notes: lead.notes,
                realtorId: parseInt(lead.realtorId),
                dateLastCalled: lead.dateLastCalled,
                dateReceived: lead.dateReceived,
                isPreapproved: lead.isPreapproved,
                docsComplete: lead.docsComplete,
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
                    <label htmlFor="name">name</label><br />
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
                    <input maxLength="16" className="form--item" type="text" id="Phone" name="Phone" required autoFocus
                        placeholder="Lead Phone"
                        onChange={editInputChange}
                        defaultValue={lead.phone} />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="preferredContact">Preferred Method of Contact</label>
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
                    <label htmlFor="notes">Notes:
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
                    <label htmlFor="isPreapproved"> Client Preapproved: </label>
                    <input type="checkbox" id="isPreapproved" checked={lead.isPreapproved} onChange={toggleCheckedObject} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="underContract"> Client Under Contract: </label>
                    <input type="checkbox" id="underContract" checked={lead.underContract} onChange={toggleCheckedObject} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="isApptSet"> Appointment Set: </label>
                    <input type="checkbox" id="isApptSet" checked={lead.isApptSet} onChange={toggleCheckedObject} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="docsComplete"> All Docs Submitted: </label>
                    <input type="checkbox" id="docsComplete" checked={lead.docsComplete} onChange={toggleCheckedObject} />
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