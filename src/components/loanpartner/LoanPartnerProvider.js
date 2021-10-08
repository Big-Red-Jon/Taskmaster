import React, { useState, createContext } from "react"

export const LoanPartnerContext = createContext()
const URL = "http://localhost:8088"

export const LoanPartnerProvider = (props) => {
    const [loanPartners, setLoanPartners] = useState([])

    const getLoanPartners = () => {
        return fetch(`${URL}/loanpartners`)
            .then(res => res.json())
            .then(setLoanPartners)
    }

    const getDocById = (loanpartnerId) => {
        return fetch(`${URL}/loanpartners/${loanpartnerId}
        `)
            .then(res => res.json())
    }

    return (
        <LoanPartnerContext.Provider value={{
            loanPartners, getLoanPartners, getDocById
        }}>
            {props.children}
        </LoanPartnerContext.Provider>
    )





}