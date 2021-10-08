import React, { useContext, useEffect, useState } from "react"
import { RealtorContext } from "./RealtorProvider"
import { RealtorDetail } from "./RealtorDetail"
import { useHistory } from "react-router-dom"
import Button from "react-bootstrap/Button"
import "./Realtor.css"

export const RealtorList = () => {
    const { realtors, getRealtors, searchTerms } = useContext(RealtorContext)

    const [filteredRealtors, setFiltered] = useState([])
    const history = useHistory()

    useEffect(() => {
        getRealtors()
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {

            const subset = realtors.filter(realtor => realtor.name.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            setFiltered(realtors)
        }
    }, [searchTerms, realtors])

    return (
        <>
            <h1>Realtors</h1>
            <section className="newButton">
                <div className="d-grid gap-2">
                    <Button variant="dark" size="lg" className="newButton" onClick={() => history.push("/realtors/create")}>
                        Add New Agent
                    </Button>{' '}
                </div>
            </section>
            <div className="realtors">
                {
                    filteredRealtors.map(realtor => {
                        return <RealtorDetail key={realtor.id} realtor={realtor} />
                    })
                }
            </div>
        </>
    )
}