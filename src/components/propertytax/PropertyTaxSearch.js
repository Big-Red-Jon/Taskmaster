import React, { useContext } from "react"
import { PropertyTaxContext } from "./PropertyTaxProvider"
import "./PropertyTax.css"

export const TaxSearch = () => {
    const { setSearchTerms } = useContext(PropertyTaxContext)

    return (
        <>
            <section className="searchBar">
                <input type="text"
                    className="input--wider"
                    onKeyUp={(event) => setSearchTerms(event.target.value)}
                    placeholder="Search for a specific County... " />
            </section>
        </>
    )
}
