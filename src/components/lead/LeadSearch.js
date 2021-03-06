import React, { useContext } from "react"
import { LeadContext } from "./LeadProvider"
import "./Lead.css"

export const LeadSearch = () => {
    const { setSearchTerms } = useContext(LeadContext)

    return (
        <>
            <section className="searchBar">
                <input type="text"
                    className="input--wider"
                    onKeyUp={(event) => setSearchTerms(event.target.value)}
                    placeholder="Search for a specific lead... " />
            </section>
        </>
    )
}
