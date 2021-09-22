import React, { useState, createContext } from "react"


export const RealtorContext = createContext()
const URL = "http://localhost:8088"

// (`${URL}/realtors?_expand=userId`)

export const RealtorProvider = (props) => {
    const [realtors, setRealtors] = useState([])
    const [searchTerms, setSearchTerms] = useState("")

    const getRealtors = () => {
        return fetch(`${URL}/realtors`)
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
        realtor.dateLastCalled = new Date(realtor.dateLastCalled)
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
            method: "DELETE"
        })
            .then(getRealtors)
    }

    const getRealtorById = (realtorId) => {
        return fetch(`${URL}/realtors/${realtorId}
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