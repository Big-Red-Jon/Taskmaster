// import React, { useContext, useEffect, useState } from "react"
// import { PropertyTaxContext } from "./PropertyTaxProvider"
import "./PropertyTax.css"
// import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"

export const PropertyTaxDetail = (props) => {
    // const [propertyTax, setPropertyTax] = useState(props.propertyTax)
    // const { propertyTaxId } = useParams();
    // const { propertyTaxes, getTaxesByCounty } = useContext(PropertyTaxContext)
    const history = useHistory()

    return (
        <section className="propertyTax">
            <div>
                <div>
                    {/* <h5>County: {props.County}</h5> */}
                    <div>County Rate: {props.CountyRate}</div>
                    <h5>City: {props.City}</h5>
                    <div>City Rate: {props.CityRate}</div>
                    <button onClick={() => {
                        history.push(`/Calculators/${props.County}/${props.City}`)
                    }}>View</button>
                </div>
            </div>
        </section >
    )

}

// <div class="card" style="width: 18rem;">
//     <div class="card-body">
//         <h5 class="card-title">Card title</h5>
//         <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
//         <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//         <a href="#" class="card-link">Card link</a>
//         <a href="#" class="card-link">Another link</a>
//     </div>
// </div>