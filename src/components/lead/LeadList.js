import React, { useContext, useEffect, useState } from "react"
import { LeadContext } from "./LeadProvider"
import { LeadDetail } from "./LeadDetail"
import { useHistory } from "react-router-dom"
import Button from "react-bootstrap/Button"
import "./Lead.css"

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

    //useEffect unmounting the component

    return (
        <>
            <div className="page-top">
                <h1>Leads</h1>
                <div className="d-grid gap-2">
                    <Button variant="dark" size="lg" className="newButton" onClick={() => history.push("/leads/create")}>
                        Add New Lead
                    </Button>{' '}
                </div>
            </div>
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