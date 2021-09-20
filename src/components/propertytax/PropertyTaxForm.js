import React, { useContext, useEffect, useState } from "react"
import { PropertyTaxContext } from "./PropertyTaxProvider"
import { LeadContext } from "../lead/LeadProvider"
import "./PropertyTax.css"
import { useHistory, useParams } from 'react-router-dom';


export const PropertyTaxForm = () => {
    const { addPropertyTax, getPropertyTaxById, updatePropertyTax } = useContext(PropertyTaxContext)
    const { leads, getLeads } = useContext(LeadContext)
    const { propertyTaxes, getPropertyTaxes } = useContext(PropertyTaxContext)
    const [propertyTax, setPropertyTax] = useState({})


    const [isLoading, setIsLoading] = useState(true);

    const { propertyTaxId } = useParams();
    const history = useHistory();


    const editInputChange = (event) => {
        const newPropertyTax = { ...propertyTax }
        newPropertyTax[event.target.id] = event.target.value
        setPropertyTax(newPropertyTax)
    }

    useEffect(() => {
        getLeads()
    }, [])

    useEffect(() => {
        if (propertyTaxId) {
            getPropertyTaxById(propertyTaxId)
                .then(propertyTax => {
                    setPropertyTax(propertyTax)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])

    const savePropertyTax = () => {
        setIsLoading(true);
        if (propertyTaxId) {
            updatePropertyTax({
                Jurisdiction: propertyTax.Jurisdiction,
                CityRate: propertyTax.CityRate,
                SpecialSchoolDistrict: propertyTax.SpecialSchoolDistrict,
                CountyRate: propertyTax.CountyRate,
                Total: propertyTax.Total,
                City: propertyTax.City,
                County: propertyTax.County,
                TaxYear: propertyTax.TaxYear

            })
                .then(() => history.push(`/propertyTaxes`))
        } else {
            addPropertyTax({
                Jurisdiction: propertyTax.Jurisdiction,
                CityRate: propertyTax.CityRate,
                SpecialSchoolDistrict: propertyTax.SpecialSchoolDistrict,
                CountyRate: propertyTax.CountyRate,
                Total: propertyTax.Total,
                City: propertyTax.City,
                County: propertyTax.County,
                TaxYear: propertyTax.TaxYear
            })
                .then(() => history.push(`/propertyTaxes`))
        }

    }



    return (

        <form className="propertyTax--form" >
            <h2>Create New Property Tax Amount</h2>
            <fieldset>
                <div>
                    <label htmlFor="County">What County is the property in? </label> < br />
                    <select name="County" id="County" onChange={editInputChange}
                        defaultValue={propertyTax.County} >
                        {propertyTaxes.map(propertyTax => (
                            <option
                                key={propertyTax.Jurisdiction}
                                value={propertyTax.Jurisdiction}
                            >
                                {propertyTax.County}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            {/* <fieldset>
                <div>
                    <label htmlFor="realtorId">Realtor: </label> <br />
                    <select id="realtorId" onChange={editInputChange} defaultValue={propertyTax.realtorId}>
                        {realtors.map(realtor => (
                            <option
                                key={realtor.id}
                                value={realtor.id}
                            >
                                {realtor.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset><br /> */}

            <button
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault()
                    savePropertyTax()
                }}>
                {propertyTaxId ? <>Save PropertyTax</> : <>Add PropertyTax</>}</button>
        </form>
    )

}