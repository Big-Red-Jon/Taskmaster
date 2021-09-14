import React, { useContext, useEffect, useState } from "react"
import { RealtorContext } from "./RealtorProvider"
import "./Realtor.css"
import { useHistory, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input/input'

export const RealtorForm = () => {
    const { addRealtor, getRealtorById, updateRealtor } = useContext(RealtorContext)
    const [realtor, setRealtor] = useState({})

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

    const saveRealtor = () => {
        setIsLoading(true);
        if (realtorId) {
            updateRealtor({
                id: parseInt(realtorId),
                name: realtor.name,
                email: realtor.email,
                phone: value,
                dateLastCalled: callDate,
                office: realtor.office,
                preferredContact: realtor.preferredContact

            })
                .then(() => history.push(`/realtors`))
        } else {
            addRealtor({
                name: realtor.name,
                email: realtor.email,
                phone: value,
                dateLastCalled: callDate,
                office: realtor.office,
                preferredContact: realtor.preferredContact

            })
                .then(() => history.push(`/realtors`))
        }

    }

    useEffect(() => {
        if (realtorId) {
            getRealtorById(realtorId)
                .then(realtor => {
                    setRealtor(realtor)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])

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
                    <label htmlFor="preferredContact">Preferred Method of Contact</label> <br />
                    <select name="preferredContact" id="preferredContact" onChange={editInputChange}
                        defaultValue={realtor.email} >
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
            <fieldset>
                <div>
                    <label htmlFor="office">Agency Office:<br />
                        <input className="form--item" type="text" id="office" name="office" required autoFocus
                            placeholder="Name of Agency..."
                            onChange={editInputChange}
                            defaultValue={realtor.office} />
                    </label>
                </div>
            </fieldset>
            <button
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault()
                    saveRealtor()
                }}>
                {realtorId ? <>Save Realtor</> : <>Add Realtor</>}</button>
        </form>
    )

}