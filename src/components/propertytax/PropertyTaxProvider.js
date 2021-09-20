import React, { useState, createContext } from "react"

export const PropertyTaxContext = createContext()
const URL = "https://comptroller.tn.gov/office-functions/pa/tax-resources/assessment-information-for-each-county/property-tax-rates/2020/_jcr_content/content/tn_complex_datatable_255281325.apidriven.2020.json?_=1631060688033"

export const PropertyTaxProvider = (props) => {
    const [propertyTaxes, setPropertyTaxes] = useState([])

    const getPropertyTaxes = () => {
        return fetch(`${URL}/data`)
            .then(res => res.json())
            .then(setPropertyTaxes)
    }

    const addPropertyTax = propertyTaxSelect => {
        return fetch(`${URL}/data`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(propertyTaxSelect)
        })
            .then(getPropertyTaxes)
    }

    const updatePropertyTax = propertyTax => {
        return fetch(`${URL}/data/${propertyTax.Jurisdiction && propertyTax.County}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(propertyTax)
        })
            .then(getPropertyTaxes)
    }

    const deletePropertyTax = propertyTaxId => {
        return fetch(`${URL}/data/${propertyTaxId}`, {
            method: "DELETE"
        })
            .then(getPropertyTaxes)
    }

    const getPropertyTaxById = (propertyTaxId) => {
        return fetch(`${URL}/data/${propertyTaxId}
        `)
            .then(res => res.json())
    }


    return (
        <PropertyTaxContext.Provider value={{
            propertyTaxes, getPropertyTaxes, addPropertyTax, deletePropertyTax, getPropertyTaxById, updatePropertyTax
        }}>
            {props.children}
        </PropertyTaxContext.Provider>
    )


}

    // "data": [
    //     {
    //         "Jurisdiction": "001",
    //         "CityRate": "0.8646",
    //         "SpecialSchoolDistrict": "",
    //         "CountyRate": "2.6016",
    //         "Total": "3.4662",
    //         "City": "CLINTON",
    //         "County": "ANDERSON",
    //         "TaxYear": "2020"
    //     },