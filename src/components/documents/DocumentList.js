import React, { useContext, useEffect, useState } from "react"
import { DocumentContext } from "./DocumentProvider"
import { DocumentDetail } from "./DocumentDetail"
import { useHistory } from "react-router-dom"
import Button from "react-bootstrap/Button"

export const DocumentList = () => {
    const { documents, getDocuments, searchTerms } = useContext(DocumentContext)

    const [filteredDocuments, setFiltered] = useState([])
    const history = useHistory()

    useEffect(() => {
        getDocuments()
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {

            const subset = documents.filter(document => document.lead.name.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            setFiltered(documents)
        }
    }, [searchTerms, documents])

    return (
        <>
            <h1>Documents</h1>
            <div className="d-grid gap-2">
                <Button variant="dark" size="lg" className="newButton" onClick={() => history.push("/documents/create")}>
                    Add New Document List
                </Button>{' '}
            </div>
            <div className="documents">
                {
                    filteredDocuments.map(document => {
                        return <DocumentDetail key={document.id} document={document} />
                    })
                }
            </div>
        </>
    )
}