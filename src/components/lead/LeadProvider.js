import React, { useState, createContext } from "react"

export const LeadContext = createContext()
const URL = "http://localhost:8088"

// ${URL}/leads

export const LeadProvider = (props) => {
    const [leads, setLeads] = useState([])
    const [searchTerms, setSearchTerms] = useState("")

    const getLeads = () => {
        return fetch(`${URL}/leads?_expand=realtor&_expand=lp`)
            .then(res => res.json())
            .then(setLeads)
    }

    const addLead = leadSelect => {
        return fetch(`${URL}/leads`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(leadSelect)
        })
            .then(getLeads)
    }

    const updateLead = lead => {
        lead.dateLastCalled = new Date(lead.dateLastCalled)
        lead.dateReceived = new Date(lead.dateReceived)
        return fetch(`${URL}/leads/${lead.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"

            },
            body: JSON.stringify(lead)
        })
            .then(getLeads)
    }

    const deleteLead = leadId => {
        return fetch(`${URL}/leads/${leadId}`, {
            method: "DELETE"
        })
            .then(getLeads)
    }

    const getLeadById = (leadId) => {
        return fetch(`${URL}/leads/${leadId}
        `)
            .then(res => res.json())
    }

    return (
        <LeadContext.Provider value={{
            leads, getLeads, addLead, updateLead, deleteLead, searchTerms, setSearchTerms, getLeadById
        }}>
            {props.children}
        </LeadContext.Provider>
    )


}