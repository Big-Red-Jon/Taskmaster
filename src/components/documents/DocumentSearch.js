import React, { useContext } from "react"
import { DocumentContext } from "./DocumentProvider"
import "./Document.css"

export const DocumentSearch = () => {
    const { setSearchTerms } = useContext(DocumentContext)

    return (
        <>
            <section className="searchBar">
                Document Search:
                <input type="text"
                    className="input--wider"
                    onKeyUp={(event) => setSearchTerms(event.target.value)}
                    placeholder="Search for a specific document... " />
            </section>
        </>
    )
}
