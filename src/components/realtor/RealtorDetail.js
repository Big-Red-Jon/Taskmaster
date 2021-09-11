import React, { useContext, useEffect, useState } from "react"
import { RealtorContext } from "./RealtorProvider"
import "./Realtor.css"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"

export const RealtorDetail = (props) => {
    const { realtors } = useContext(RealtorContext)
    const { deleteRealtor } = useContext(RealtorContext)
    const [realtor, setrealtor] = useState(props.realtor || { loanpartner: {} })

    const { realtorId } = useParams();
    const history = useHistory()

    const handleRelease = () => {
        deleteRealtor(realtor.id)
            .then(() => {
                history.push("/")
            })
    }

    useEffect(() => {
        if (!props.realtor) {
            const thisRealtor = realtors.find(realtor => realtor.id === parseInt(realtorId)) || { loanpartner: {} }
            setrealtor(thisRealtor)
        }
    }, [realtorId])

    return (
        <section className="realtor">
            <h4>{realtor.name}</h4>
            <div>Phone: {realtor.phone}</div>
            <div>Email: {realtor.email}</div>

            <button onClick={handleRelease}>Delete Realtor </button>
            <button> onClick={() => {
                history.push(`/realtors/edit/${realtor.id}`)
            }}</button>
        </section>
    )




}