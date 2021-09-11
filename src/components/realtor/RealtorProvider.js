import React, { useState, createContext } from "react"


export const RealtorContext = createContext()
const URL = "http://localhost:8088"

// (`${URL}/leads?_expand=userId`)

export const RealtorProvider = (props) => {
    const [realtors, setRealtors] = useState([])
    const [searchTerms, setSearchTerms] = useState("")

    const getRealtors = () => {
        return fetch(`${URL}/realtors?_expand=userId`)
            .then(res => res.json())
            .then(setRealtors)
    }

    const addRealtor = realtorSelect => {
        return fetch(`${URL}/realtors`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(realtorSelect)
        })
            .then(getRealtors)
    }

    const updateRealtor = realtor => {
        return fetch(`${URL}/realtors/${realtor.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(realtor)
        })
            .then(getRealtors)
    }

    const deleteRealtor = realtorId => {
        return fetch(`${URL}/realtors/${realtorId}`, {
            method: "Delete"
        })
            .then(getRealtors)
    }

    const getRealtorById = (articleId) => {
        return fetch(`${URL}/${articleId}
        `)
            .then(res => res.json())
    }

    return (
        <RealtorContext.Provider value={{
            realtors, getRealtors, addRealtor, updateRealtor, deleteRealtor, searchTerms, setSearchTerms, getRealtorById
        }}>
            {props.children}
        </RealtorContext.Provider>
    )

}