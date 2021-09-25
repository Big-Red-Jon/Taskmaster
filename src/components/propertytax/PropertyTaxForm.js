import React, { useContext, useEffect, useState } from "react"
import { PropertyTaxContext } from "./PropertyTaxProvider"
import { LeadContext } from "../lead/LeadProvider"
import "./PropertyTax.css"
import { useHistory, useParams } from 'react-router-dom';


export const PropertyTaxForm = () => {
    const { addPropertyTax, getPropertyTaxById, updatePropertyTax } = useContext(PropertyTaxContext)
    const { propertyTaxes, getTaxesByCounty } = useContext(PropertyTaxContext)
    const [propertyTax, setPropertyTax] = useState({})


    const [isLoading, setIsLoading] = useState(true);

    const { propertyTaxId } = useParams();
    const history = useHistory();


    const [selected, setSelected] = React.useState("");


    const changeSelectOptionHandler = (event) => {
        setSelected(event.target.value);
    };

    useEffect(() => {
        getTaxesByCounty()
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

    /** Different arrays for different dropdowns */
    const countyChoice = [propertyTax.County]
    const cityChoice = [propertyTax.City]
    const specialSchoolDistrictChoice = [propertyTax.SpecialSchoolDistrict]

    /** Type variable to store different array for different dropdown */
    let type = null;

    /** This will be used to create set of options that user will see */
    let options = null;

    /** Setting Type variable according to dropdown */
    if (selected === propertyTax.County) {
        type = countyChoice;
    } else if (selected === propertyTax.City) {
        type = cityChoice;
    } else if (selected === propertyTax.SpecialSchoolDistrict) {
        type = specialSchoolDistrictChoice;
    }

    /** If "Type" is null or undefined then options will be null,
     * otherwise it will create a options iterable based on our array
     */
    if (type) {
        options = type.map((el) => <option key={el}>{el}</option>);
    }

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
                    <label htmlFor="Price">Asking Price</label><br />
                    <input className="form--item" type="text" id="price" name="price" required autoFocus
                        placeholder="Asking Price On Property"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="County">What County is the property in? </label> < br />
                    <select name="County" id="County" onChange={changeSelectOptionHandler}
                        defaultValue={propertyTax.County} >
                        {propertyTaxes.map(propertyTax => (
                            <option
                                key={propertyTax.Jurisdiction}
                                value={propertyTax.County}
                            >
                                {propertyTax.County}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="City">What City is the property in? </label> < br />
                    <select name="City" id="City" onChange={changeSelectOptionHandler}
                        defaultValue={propertyTax.City} >
                        {propertyTaxes.map(propertyTax => (
                            <option
                                key={propertyTax.Jurisdiction}
                                value={propertyTax.City}
                            >
                                {propertyTax.City}
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



