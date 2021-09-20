import React, { useContext, useEffect, useState } from "react"
import { PropertyTaxContext } from "./PropertyTaxProvider"
import { PropertyTaxDetail } from "./PropertyTaxDetail"
import { useHistory } from "react-router-dom"

export const PropertyTaxList = () => {
    const { propertyTaxes, getPropertyTaxes } = useContext(PropertyTaxContext)

    const history = useHistory()

    useEffect(() => {
        getPropertyTaxes()
    }, [])


    return (
        <>
            <h1>PropertyTaxes</h1>
            <button className="newButton" onClick={() => history.push("/Calculators/create")}>
                Add New PropertyTax
            </button>
            <div className="propertyTaxes">
                {
                    propertyTaxes.map(propertyTax => {
                        return <PropertyTaxDetail key={propertyTax.Jurisdiction} propertyTax={propertyTax} />
                    })
                }
            </div>
        </>
    )
}