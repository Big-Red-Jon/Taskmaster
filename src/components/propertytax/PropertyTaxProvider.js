import React, { useState, createContext } from "react"

export const PropertyTaxContext = createContext()
const URL = "http://localhost:8010/proxy/office-functions/pa/tax-resources/assessment-information-for-each-county/property-tax-rates/2020/_jcr_content/content/tn_complex_datatable_255281325.apidriven.2020.json?_=1631060688033"

export const PropertyTaxProvider = (props) => {
    const [propertyTaxes, setPropertyTaxes] = useState([])
    const [searchTerms, setSearchTerms] = useState("")

    const groupByCounties = (array, key) => {
        return array.reduce((result, currentValue) => {
            (result[currentValue[key]] = result[currentValue[key]] || []).push(
                currentValue
            );
            return result;
        }, {})
    }

    const getTaxesByCounty = () => {
        return fetch(`${URL}`)
            .then(res => res.json())
            .then(res => setPropertyTaxes(groupByCounties(res.data, "County"))
            )
    }

    const addPropertyTax = propertyTaxSelect => {
        return fetch(`${URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(propertyTaxSelect)
        })
            .then(getTaxesByCounty)
    }

    const updatePropertyTax = propertyTax => {
        return fetch(`${URL}/${propertyTax.Jurisdiction && propertyTax.County}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(propertyTax)
        })
            .then(getTaxesByCounty)
    }

    const deletePropertyTax = propertyTaxId => {
        return fetch(`${URL}/${propertyTaxId}`, {
            method: "DELETE"
        })
            .then(getTaxesByCounty)
    }

    const getPropertyTaxById = (propertyTaxCounty) => {
        return fetch(`${URL}/${propertyTaxCounty}
        `)
            .then(res => res.json())
    }


    return (
        <PropertyTaxContext.Provider value={{
            propertyTaxes, getTaxesByCounty, addPropertyTax, deletePropertyTax, searchTerms, setSearchTerms, getPropertyTaxById, updatePropertyTax
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