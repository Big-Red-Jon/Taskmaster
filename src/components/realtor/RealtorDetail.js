import React, { useContext, useEffect, useState } from "react"
import { RealtorContext } from "./RealtorProvider"
import "./Realtor.css"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { formatPhoneNumber } from 'react-phone-number-input'

export const RealtorDetail = (props) => {
    const { realtors, deleteRealtor } = useContext(RealtorContext)
    const [realtor, setRealtor] = useState(props.realtor || { realtor: {} })
    const { realtorId } = useParams();
    const history = useHistory()
    const handleRelease = () => {
        deleteRealtor(realtor.id)
            .then(() => {
                history.push("/realtors")
            })
    }

    useEffect(() => {
        if (!props.realtor) {
            const thisRealtor = realtors.find(realtor => realtor.id === parseInt(realtorId))
            setRealtor(thisRealtor)
        }
    }, [realtorId])

    return (
        <section className="realtor">
            <h4>{realtor.name}</h4>
            <div>Phone: {formatPhoneNumber(realtor.phone)}</div>
            <div>Email: {realtor.email}</div>
            <div>Agency: {realtor.office}</div>

            <button onClick={handleRelease}>Delete Realtor </button>
            <button onClick={() => {
                history.push(`/realtors/edit/${realtor.id}`)
            }}>Update Agent</button>
        </section>
    )




}