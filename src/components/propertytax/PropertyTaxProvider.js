import React, { useState, createContext } from "react"

export const PropertyTaxContext = createContext()
const URL = "https://comptroller.tn.gov/office-functions/pa/tax-resources/assessment-information-for-each-county/property-tax-rates/2020/_jcr_content/content/tn_complex_datatable_255281325.apidriven.2020.json?_=1631060688033"

export const PropertyTaxProvider = (props) => {
    const [propertytaxes, setPropertyTaxs] = useState([])

    const getPropertyTaxes = () => {
        return fetch(`${URL}/propertytaxs?_expand=userId`)
            .then(res => res.json())
            .then(setPropertyTaxs)
    }

    const addPropertyTax = propertytaxSelect => {
        return fetch(`${URL}/propertytaxes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(propertytaxSelect)
        })
            .then(getPropertyTaxes)
    }

    const deletePropertyTax = propertytaxId => {
        return fetch(`${URL}/propertytaxes/${propertytaxId}`, {
            method: "DELETE"
        })
            .then(getPropertyTaxes)
    }

    const getPropertyTaxById = (propertytaxId) => {
        return fetch(`${URL}/propertytaxes/${propertytaxId}
        `)
            .then(res => res.json())
    }


    return (
        <PropertyTaxContext.Provider value={{
            propertytaxes, getPropertyTaxes, addPropertyTax, deletePropertyTax, getPropertyTaxById
        }}>
            {props.children}
        </PropertyTaxContext.Provider>
    )


}

// Table propTax {
//     id integer
//     leadId integer
//     address varchar
//     price integer
//     countyTax integer
//     cityTax integer