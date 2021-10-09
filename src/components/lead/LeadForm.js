import React, { useContext, useEffect, useState } from "react"
import { LeadContext } from "./LeadProvider"
import { RealtorContext } from "../realtor/RealtorProvider";
import "./Lead.css"
import { useHistory, useParams } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input/input'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { Col, Row, FormGroup, FormControl, InputGroup } from "react-bootstrap";
// import { LoanPartnerContext } from "../loanpartner/LoanPartnerProvider";
// import NumberFormat from 'react-number-format';


export const LeadForm = () => {
    const { addLead, getLeadById, updateLead } = useContext(LeadContext)
    const { realtors, getRealtors } = useContext(RealtorContext)
    // const { loanpartners, getLoanPartners } = useContext(LoanPartnerContext)
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
        loanpartnerId: 0,
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
    const currentLp = parseInt(sessionStorage.getItem("taskmaster_loanpartner"))
    const currentRealtor = parseInt(lead.realtorId)



    const saveLead = () => {
        if (lead.name === "" || lead.email === "" || lead.preferredContact === "" || lead.realtorId === 0) {
            window.alert("Please Complete the Form Before Submitting")
        } else {
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
                    loanpartnerId: currentLp,
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
                    loanpartnerId: currentLp,
                    underContract: lead.underContract,
                    isApptSet: lead.isApptSet
                })
                    .then(() => history.push(`/leads`))
            }
        }

    }


    return (
        <>
            <FormGroup className="lead--form" >
                <h2>{leadId ? <>Edit Lead</> : <>Add New Lead</>}</h2>

                <InputGroup className="mb-3" style={{ width: '55%' }}>
                    <InputGroup.Text htmlFor="name">Lead Name</InputGroup.Text>
                    <FormControl aria-label="First name" id="name" name="name" required autoFocus
                        placeholder="Name Here"
                        onChange={editInputChange}
                        defaultValue={lead.name} />
                    {/* <FormControl aria-label="Last name" /> */}
                </InputGroup>
                <fieldset>
                    <Form.Group style={{ width: '55%' }} className="mb-3" controlId="formBasicEmail">
                        <Form.Label htmlFor="email">Email address</Form.Label>
                        <Form.Control type="email" id="email" name="email" placeholder="Enter Lead email" required autoFocus
                            onChange={editInputChange}
                            defaultValue={lead.email} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                </fieldset>
                <fieldset>
                    <label htmlFor="phone" >Phone:</label><br />
                    <PhoneInput style={{ width: '50%' }} country="US" className="form--item" id="phone" name="phone" required autoFocus
                        placeholder="Enter phone number"
                        value={lead.phone || value}
                        onChange={setValue}
                        defaultValue={lead.phone}
                    />
                </fieldset>
                <fieldset style={{ width: '50%' }}>
                    <Form.Select htmlFor="preferredContact" className="form--item" aria-label="Default select example" id="preferredContact" name="preferredContact" onChange={editInputChange}
                        value={lead.preferredContact} defaultValue={lead.preferredContact}>
                        {/* <select name="preferredContact" className="form--item" id="preferredContact" onChange={editInputChange}
                        defaultValue={lead.preferredContact} /> */}
                        <option>Preferred Method of Contact</option>
                        <option value="Email">Email</option>
                        <option value="Phone">Phone</option>
                        <option value="Text">Text</option>
                    </Form.Select>
                </fieldset>

                <fieldset style={{ width: '50%' }}>
                    <Form.Select htmlFor="realtorId" name="realtorId" className="form--item" id="realtorId" onChange={editInputChange}
                        value={parseInt(lead.realtorId)} defaultValue={parseInt(lead.realtorId)} >
                        <option>Select Lead Realtor</option>
                        {realtors.map(realtor => (
                            <option
                                key={realtor.id}
                                value={realtor.id}
                            >
                                {realtor.name}
                            </option>))}
                    </Form.Select>
                </fieldset>
                <fieldset>
                    <Form.Group style={{ width: '55%' }} className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label htmlFor="notes">Lead Notes</Form.Label>
                        <Form.Control as="textarea" rows={2} id="notes" name="notes" required autoFocus
                            placeholder="Notes on Lead"
                            onChange={editInputChange}
                            defaultValue={lead.notes} />
                    </Form.Group>
                </fieldset>

                <fieldset>
                    <div style={{ width: '200%' }} className="form-group">
                        <label htmlFor="dateLastCalled"> Date Last Called: </label>
                        <DatePicker className="form--item" id="dateLastCalled" dateFormat={FORMAT} selected={callDate} onChange={(FORMAT) => setCallDate(FORMAT)} />
                    </div>
                </fieldset>

                <fieldset >
                    <div style={{ width: '200%' }} className="form-group">
                        <label htmlFor="dateReceived"> Date Received: </label>
                        <DatePicker className="form--item" id="dateReceived" dateFormat={FORMAT} selected={receiveDate} onChange={(FORMAT) => setReceiveDate(FORMAT)} />
                    </div>
                </fieldset>


                <fieldset>
                    <div className="form-group">
                        <input type="checkbox" className="check-item" id="isPreapproved" checked={lead.isPreapproved} onChange={editCheckChange} />
                        <label htmlFor="isApproved">Client Preapproved </label>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <input type="checkbox" className="check-item" id="underContract" checked={lead.underContract} onChange={editCheckChange} />
                        <label htmlFor="underContract"> Client Under Contract </label>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <input type="checkbox" className="check-item" id="isApptSet" checked={lead.isApptSet} onChange={editCheckChange} />
                        <label htmlFor="isApptSet"> Appointment Set </label>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <input type="checkbox" className="check-item" id="docsComplete" checked={lead.docsComplete} onChange={editCheckChange} />
                        <label htmlFor="docsComplete"> All Docs Submitted </label>
                    </div>
                </fieldset>
                <br />
                <Button variant="primary" size="lg"
                    disabled={isLoading}
                    onClick={event => {
                        event.preventDefault()
                        saveLead()
                    }}>
                    {leadId ? <>Save Lead</> : <>Add Lead</>}</Button>{' '}
            </FormGroup >

        </>

    )

}

// {/* <form className="lead--form" >
// <h2>{leadId ? <>Edit Lead</> : <>Add New Lead</>}</h2>
// <fieldset>
//     <div>
//         <label htmlFor="name">Name</label><br />
//         <input className="form--item" type="text" id="name" name="name" required autoFocus
//             placeholder="Lead Name"
//             onChange={editInputChange}
//             defaultValue={lead.name} />
//     </div>
// </fieldset>
// <fieldset>
//     <div>
//         <label htmlFor="email">Email:</label><br />
//         <input className="form--item" type="text" id="email" name="email" required autoFocus
//             placeholder="Lead Email"
//             onChange={editInputChange}
//             defaultValue={lead.email} />
//     </div>
// </fieldset>
// <fieldset>
//     <div >
//         <label htmlFor="phone">Phone:</label><br />
//         <PhoneInput country="US" className="form--item" id="phone" name="phone" required autoFocus
//             placeholder="Enter phone number"
//             value={lead.phone || value}
//             onChange={setValue}
//             defaultValue={lead.phone}
//         />
//     </div>
// </fieldset>
// <fieldset>
//     <div>
//         <label htmlFor="preferredContact">Preferred Method of Contact</label> < br />
//         <select name="preferredContact" className="form--item" id="preferredContact" onChange={editInputChange}
//             defaultValue={lead.preferredContact} >
//             <option value="Email">Email</option>
//             <option value="Phone">Phone</option>
//             <option value="Text">Text</option>
//         </select>
//     </div>
// </fieldset>
// <fieldset>
//     <div>
//         <label htmlFor="notes">Notes: <br />
//             <textarea type="text" id="notes" name="notes" required autoFocus
//                 placeholder="Notes on Lead"
//                 onChange={editInputChange}
//                 defaultValue={lead.notes} />
//         </label>
//     </div>
// </fieldset>
// <fieldset>
//     <div>
//         {/* <option value="" disabled selected>Select your option</option> */}
//         <label htmlFor="realtorId">Realtor: </label> <br />
//         <select id="realtorId" className="form--item" onChange={editInputChange} defaultValue={parseInt(lead.realtorId)}>
//             {realtors.map(realtor => (
//                 <option
//                     key={realtor.id}
//                     value={realtor.id}
//                 >
//                     {realtor.name}
//                 </option>
//             ))}
//         </select>
//     </div>
// </fieldset><br />
// <fieldset>
//     <div className="form-group">
//         <label htmlFor="dateLastCalled"> Date Last Called: </label>
//         <DatePicker className="form--item" id="dateLastCalled" dateFormat={FORMAT} selected={callDate} onChange={(FORMAT) => setCallDate(FORMAT)} />
//     </div>
// </fieldset>
// <fieldset>
//     <div className="form-group">
//         <label htmlFor="dateReceived"> Date Received: </label>
//         <DatePicker className="form--item" id="dateReceived" dateFormat={FORMAT} selected={receiveDate} onChange={(FORMAT) => setReceiveDate(FORMAT)} />
//     </div>
// </fieldset>
// <fieldset>
//     <div className="form-group">
//         <label htmlFor="isApproved"> Client Preapproved: </label>
//         <input type="checkbox" id="isPreapproved" checked={lead.isPreapproved} onChange={editCheckChange} />
//     </div>
// </fieldset>
// <fieldset>
//     <div className="form-group">
//         <label htmlFor="underContract"> Client Under Contract: </label>
//         <input type="checkbox" id="underContract" checked={lead.underContract} onChange={editCheckChange} />
//     </div>
// </fieldset>
// <fieldset>
//     <div className="form-group">
//         <label htmlFor="isApptSet"> Appointment Set: </label>
//         <input type="checkbox" id="isApptSet" checked={lead.isApptSet} onChange={editCheckChange} />
//     </div>
// </fieldset>
// <fieldset>
//     <div className="form-group">
//         <label htmlFor="docsComplete"> All Docs Submitted: </label>
//         <input type="checkbox" id="docsComplete" checked={lead.docsComplete} onChange={editCheckChange} />
//     </div>
// </fieldset>
// <button
//     disabled={isLoading}
//     onClick={event => {
//         event.preventDefault()
//         saveLead()
//     }}>
//     {leadId ? <>Save Lead</> : <>Add Lead</>}</button>
// </form> */}