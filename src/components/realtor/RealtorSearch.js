import React, { useContext } from "react"
import { RealtorContext } from "./RealtorProvider"
import "./Realtor.css"

export const LeadSearch = () => {
    const { setSearchTerms } = useContext(RealtorContext)

    return (
        <>
            <section className="input--all">
                Lead Search:
                <input type="text"
                    className="input--wider"
                    onKeyUp={(event) => setSearchTerms(event.target.value)}
                    placeholder="Search for a specific Realtor... " />
            </section>
        </>
    )
}
