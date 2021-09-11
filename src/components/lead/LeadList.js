import React, { useContext, useEffect, useState } from "react"
import { LeadContext } from "./LeadProvider"
import { LeadDetail } from "./LeadDetail"
import { useHistory } from "react-router-dom"

export const LeadList = () => {
    const { leads, getLeads, searchTerms } = useContext(LeadContext)

    const [filteredLeads, setFiltered] = useState([])
    const history = useHistory()

    useEffect(() => {
        getLeads()
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {

            const subset = leads.filter(lead => lead.name.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            setFiltered(leads)
        }
    }, [searchTerms, leads])

    return (
        <>
            <h1>Leads</h1>
            <button className="newButton" onClick={() => history.push("/create")}>
                Add New Lead
            </button>
            <div className="leads">
                {
                    filteredLeads.map(lead => {
                        return <LeadDetail key={lead.id} lead={lead} />
                    })
                }
            </div>
        </>
    )
}