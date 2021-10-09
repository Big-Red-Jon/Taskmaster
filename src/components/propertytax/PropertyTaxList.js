import React, { useContext, useEffect, useState } from "react"
import { PropertyTaxContext } from "./PropertyTaxProvider"
import { PropertyTaxDetail } from "./PropertyTaxDetail"
import { useHistory } from "react-router-dom"


export const PropertyTaxList = () => {
    const { propertyTaxes, getTaxesByCounty, searchTerms } = useContext(PropertyTaxContext)
    const [filteredTaxes, setFiltered] = useState([])

    useEffect(() => {
        getTaxesByCounty()
    }, [])

    const history = useHistory()
    const countyKeys = Object.keys(propertyTaxes)

    useEffect(() => {
        if (searchTerms !== "") {

            const subset = countyKeys.filter(county => county.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            setFiltered(propertyTaxes)
        }
    }, [searchTerms, propertyTaxes])



    return (
        <>
            <div>
                <div className="propertyTaxes">
                    <h1>PropertyTaxes</h1>
                    {
                        countyKeys.map(county => (<>
                            <h4 className="card-title-tax" eventKey="++">{county} COUNTY</h4>
                            {propertyTaxes[county].map(props =>
                                (<PropertyTaxDetail {...props} />))}</>)
                        )
                    }
                </div>
            </div>
        </>
    )
}
