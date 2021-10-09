import React, { useContext } from "react"
import { RealtorContext } from "./RealtorProvider"
import "./Realtor.css"

export const RealtorSearch = () => {
    const { setSearchTerms } = useContext(RealtorContext)

    return (
        <>
            <section className="searchBarAgent">
                <input type="text"
                    className="input--wider"
                    onKeyUp={(event) => setSearchTerms(event.target.value)}
                    placeholder="Search for a specific Realtor... " />
            </section>
        </>
    )
}
