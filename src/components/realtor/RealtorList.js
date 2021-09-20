import React, { useContext, useEffect, useState } from "react"
import { RealtorContext } from "./RealtorProvider"
import { RealtorDetail } from "./RealtorDetail"
import { useHistory } from "react-router-dom"

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
                <button onClick={() => history.push("/realtors/create")}>
                    Add New Realtor
                </button>
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