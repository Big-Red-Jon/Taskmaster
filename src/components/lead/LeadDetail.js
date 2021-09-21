import React, { useContext, useEffect, useState } from "react"
import { LeadContext } from "./LeadProvider"
import "./Lead.css"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { DocumentContext } from "../documents/DocumentProvider"
import { formatPhoneNumber } from 'react-phone-number-input'
import moment from "moment"

export const LeadDetail = (props) => {
    const { leads } = useContext(LeadContext)
    const { deleteLead } = useContext(LeadContext)
    const [lead, setLead] = useState(props.lead || { loanPartner: {} })
    const { documents, getDocuments } = useContext(DocumentContext)
    const { leadId } = useParams();
    const history = useHistory()

    const handleRelease = () => {
        deleteLead(lead.id)
            .then(() => {
                history.push("/leads")
            })
    }

    useEffect(() => {
        getDocuments()
    }, [])

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
            <div> Date Last Called: {lead.dateLastCalled} </div>
            <div>Phone: {formatPhoneNumber(lead.phone)}</div>
            <div>Email: {lead.email}</div>
            <div>Realtor: {lead.realtor.name} from {lead.realtor.office}</div>
            <button onClick={() => {
                history.push(`/documents/detail/${lead.id}`)
            }}>View Documents</button>
            <button onClick={() => {
                history.push(`/leads/edit/${lead.id}`)
            }}>Update Lead</button>
            <button onClick={handleRelease}>Delete Lead </button>
        </section>
    )




}

{/* <div class="card" style="width: 18rem;">
    <img class="card-img-top" src="..." alt="Card image cap"/>
    <div class ="card-body">
    <h5 class ="card-title">Card title</h5>
    <p class ="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class ="btn btn-primary">Go somewhere</a>
    </div>
</div> */}