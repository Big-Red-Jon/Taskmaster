import React, { useContext, useEffect, useState } from "react"
import { RealtorContext } from "./RealtorProvider"
import { useHistory, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input/input'
import Button from "react-bootstrap/Button"
import "./Realtor.css"

export const RealtorForm = () => {
    const { addRealtor, getRealtorById, updateRealtor } = useContext(RealtorContext)
    const { realtors, getRealtors } = useContext(RealtorContext)
    const [realtor, setRealtor] = useState({
        id: 0,
        name: "",
        email: "",
        phone: "",
        dateLastCalled: "",
        office: "",
        preferredContact: ""

    })


    const [value, setValue] = useState()
    const [callDate, setCallDate] = useState(new Date())

    const [isLoading, setIsLoading] = useState(true);

    const { realtorId } = useParams();
    const history = useHistory();

    const editInputChange = (event) => {
        const newRealtor = { ...realtor }
        newRealtor[event.target.id] = event.target.value
        setRealtor(newRealtor)
    }

    useEffect(() => {
        getRealtors()
    }, [])

    useEffect(() => {
        if (realtorId) {
            getRealtorById(realtorId)
                .then(realtor => {
                    setRealtor(realtor)
                    setCallDate(Date.parse(realtor.dateLastCalled.substring(0, 10).replace("-", "/")))
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])

    const saveRealtor = () => {
        setIsLoading(true);
        if (realtorId) {
            updateRealtor({
                id: parseInt(realtorId),
                name: realtor.name,
                email: realtor.email,
                phone: value || realtor.phone,
                dateLastCalled: callDate,
                office: realtor.office,
                preferredContact: realtor.preferredContact

            })
                .then(() => history.push(`/realtors`))
        } else {
            addRealtor({
                name: realtor.name,
                email: realtor.email,
                phone: value || realtor.phone,
                dateLastCalled: callDate,
                office: realtor.office,
                preferredContact: realtor.preferredContact

            })
                .then(() => history.push(`/realtors`))
        }

    }

    return (

        <form className="realtor--form" >
            <h2>Realtor Form</h2>
            <fieldset>
                <div>
                    <label htmlFor="name">Name</label><br />
                    <input className="form--item" type="text" id="name" name="name" required autoFocus
                        placeholder="Realtor Name"
                        onChange={editInputChange}
                        defaultValue={realtor.name} />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="email">Email:</label><br />
                    <input className="form--item" type="text" id="email" name="email" required autoFocus
                        placeholder="Realtor Email"
                        onChange={editInputChange}
                        defaultValue={realtor.email} />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="office">Agency:</label><br />
                    <input className="form--item" type="text" id="office" name="office" required autoFocus
                        placeholder="Name of Agency"
                        onChange={editInputChange}
                        defaultValue={realtor.office} />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="phone">Phone:</label><br />
                    <PhoneInput maxLength="16" country="US" className="form--item" id="phone" name="phone" required autoFocus
                        placeholder="Enter phone number"
                        value={realtor.phone || value}
                        onChange={setValue}
                        defaultValue={realtor.phone} />
                </div>
            </fieldset>
            <fieldset>
                <div className="contact">
                    <label htmlFor="preferredContact">Preferred Method of Contact</label> <br />
                    <select style={{ width: "25%" }} name="preferredContact" id="preferredContact" onChange={editInputChange}
                        defaultValue={realtor.preferredContact} >
                        <option value="Email">Email</option>
                        <option value="Phone">Phone</option>
                        <option value="Text">Text</option>
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="dateLastContact"> Date Last Contacted: </label>
                    <DatePicker id="dateLastContact" selected={callDate} onChange={(date) => setCallDate(date)} />
                </div>
            </fieldset>
            <br />
            <Button variant="primary" size="lg"
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault()
                    saveRealtor()
                }}>
                {realtorId ? <>Update Realtor</> : <>Add Realtor</>}</Button>{' '}

        </form>
    )

}