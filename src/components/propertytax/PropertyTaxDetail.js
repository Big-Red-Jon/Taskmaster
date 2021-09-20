import React, { useContext, useEffect, useState } from "react"
import { PropertyTaxContext } from "./PropertyTaxProvider"
import "./PropertyTax.css"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"



export const PropertyTaxDetail = (props) => {
    const { propertyTaxes } = useContext(PropertyTaxContext)
    const { deletePropertyTax } = useContext(PropertyTaxContext)
    const [propertyTax, setPropertyTax] = useState(props.propertyTax)
    //look at props.propertyTax
    const { propertyTaxId } = useParams();
    const history = useHistory()

    const handleRelease = () => {
        deletePropertyTax(propertyTax.id)
            .then(() => {
                history.push("/propertyTaxes")
            })
    }

    useEffect(() => {
        console.log(props);
        if (!props.propertyTax) {
            const thisPropertyTax = propertyTaxes.find(propertyTax => propertyTax.id === parseInt(propertyTaxId))
            setPropertyTax(thisPropertyTax)
        }
    }, [propertyTaxId])

    return (
        <section className="propertyTax">
            <h4>County: {propertyTax.County}</h4>
            <div>County Rate: {propertyTax.CountyRate}</div>
            <div>City {propertyTax.City}</div>
            <div>City Rate: {propertyTax.CityRate}</div>
            <div> Tax Year: {propertyTax.TaxYear}</div>

            {/* <button onClick={() => {
                history.push(`/documents/detail/${propertyTax.id}`)
            }}>View Documents</button> */}
            <button onClick={handleRelease}>Delete PropertyTax </button>
            {/* <button onClick={() => {
                history.push(`/propertyTaxes/edit/${propertyTax.id}`)
            }}>Update PropertyTax</button> */}
        </section>
    )




}