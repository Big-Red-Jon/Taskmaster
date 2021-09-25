import React, { useContext, useEffect, useState } from "react"
import { PropertyTaxContext } from "./PropertyTaxProvider"
import { PropertyTaxDetail } from "./PropertyTaxDetail"

export const PropertyTaxList = () => {
    const { propertyTaxes, getTaxesByCounty } = useContext(PropertyTaxContext)

    useEffect(() => {
        getTaxesByCounty()
    }, [])


    const countyKeys = Object.keys(propertyTaxes)


    return (
        <>
            <h1>PropertyTaxes</h1>
            {/* <button className="newButton" onClick={() => history.push("/Calculators/create")}>
                Calculate a Property Tax
            </button> */}
            <div className="propertyTaxes">
                {
                    countyKeys.map(county => (<><h4>County:{county}</h4>{propertyTaxes[county].map(props => (<PropertyTaxDetail {...props} />))}</>)

                    )
                }
            </div>
        </>
    )


}
// const test = Counties.map(county => ))