import React, { useContext, useEffect, useState } from "react"
import { LeadContext } from "./LeadProvider"
import "./Lead.css"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"


export const LeadDetail = (props) => {
    const { leads } = useContext(LeadContext)
    const { deleteLead } = useContext(LeadContext)
    const [lead, setLead] = useState(props.lead || { loanPartner: {} })
    //look at props.lead
    const { leadId } = useParams();
    const history = useHistory()

    const handleRelease = () => {
        deleteLead(lead.id)
            .then(() => {
                history.push("/leads")
            })
    }

    useEffect(() => {
        console.log(props);
        if (!props.lead) {
            const thisLead = leads.find(lead => lead.id === parseInt(leadId)) || { loanPartner: {} }
            setLead(thisLead)
        }
    }, [leadId])

    return (
        <section className="lead">
            <h4>{lead.name}</h4>
            <div>Phone: {lead.phone}</div>
            <div>Email: {lead.email}</div>
            <div>Realtor: {lead.realtor.name} from {lead.realtor.office}</div>
            <button onClick={() => {
                history.push(`/documents/detail/${lead.id}`)
            }}>View Documents</button>
            <button onClick={handleRelease}>Delete Lead </button>
            <button onClick={() => {
                history.push(`/leads/edit/${lead.id}`)
            }}>Update Lead</button>
        </section>
    )




}