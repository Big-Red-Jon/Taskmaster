import React, { useState, createContext } from "react"
import { LeadContext } from "../lead/LeadProvider"

export const DocumentContext = createContext()
const URL = "http://localhost:8088"

export const DocumentProvider = (props) => {
    const [documents, setDocuments] = useState([])
    const [searchTerms, setSearchTerms] = useState("")

    const getDocuments = () => {
        return fetch(`${URL}/documents?_expand=lead`)
            .then(res => res.json())
            .then(setDocuments)
    }

    const addDocument = documentSelect => {
        return fetch(`${URL}/documents`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(documentSelect)
        })
            .then(getDocuments)
    }

    const updateDocument = document => {
        return fetch(`${URL}/documents/${document.id}`, {
            method: "PATCH",
            header: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(document)
        })
            .then(getDocuments)
    }

    const deleteDocument = documentId => {
        return fetch(`${URL}/documents/${documentId}`, {
            method: "DELETE"
        })
            .then(getDocuments)
    }

    const getDocById = (documentId) => {
        return fetch(`${URL}/documents/${documentId}
        `)
            .then(res => res.json())
    }

    return (
        <DocumentContext.Provider value={{
            documents, getDocuments, addDocument, updateDocument, deleteDocument, getDocById, searchTerms, setSearchTerms
        }}>
            {props.children}
        </DocumentContext.Provider>
    )





}