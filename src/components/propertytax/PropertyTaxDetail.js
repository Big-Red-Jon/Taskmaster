import React, { useContext, useEffect, useState } from "react"
import { PropertyTaxContext } from "./PropertyTaxProvider"
import "./PropertyTax.css"
// import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"

export const PropertyTaxDetail = (props) => {
    const { propertyTaxes } = useContext(PropertyTaxContext)
    const [propertyTax, setPropertyTax] = useState(props.propertyTax)
    //look at props.propertyTax
    // const { propertyTaxId } = useParams();
    const history = useHistory()

    return (
        <section className="propertyTax">
            <div>County Rate: {props.CountyRate}</div>
            <h4>City: {props.City}</h4>
            <div>City Rate: {props.CityRate}</div>
            <button onClick={() => {
                history.push(`/Calculators/${props.County}/${props.City}`)
            }}>View</button>
        </section>
    )

}

