import React, { useState } from "react"
// import { PropertyTaxContext } from "./PropertyTaxProvider"
import "./PropertyTax.css"
// import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"
import Card from 'react-bootstrap/Card';
import { ListGroup } from "react-bootstrap";
import { Collapse } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import { Accordion } from "react-bootstrap";


export const PropertyTaxDetail = (props) => {
    // const [propertyTax, setPropertyTax] = useState(props.propertyTax)
    // const { propertyTaxId } = useParams();
    // const { propertyTaxes, getTaxesByCounty } = useContext(PropertyTaxContext)
    const history = useHistory()

    const [open, setOpen] = useState(false);

    return (
        <section className="propertyTax">
            <div className="d-grid gap-2">
                <Button

                    className="button"
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                    variant="light"
                    size="lg"
                >
                    {props.City || props.County}
                </Button>
            </div>
            <Collapse in={open}>
                <div id="example-collapse-text">
                    < Card style={{ width: '25rem' }}>
                        <ListGroup variant="flush">
                            {/* <ListGroup.Item>{props.City}</ListGroup.Item> */}
                            {/* <ListGroup.Item>County: {props.County}</ListGroup.Item> */}
                            <ListGroup.Item>County Rate: {props.CountyRate}</ListGroup.Item>
                            <ListGroup.Item>City Rate: {props.CityRate}</ListGroup.Item>
                            <ListGroup.Item>Total: {props.Total}</ListGroup.Item>
                        </ListGroup>
                    </Card >
                </div>
            </Collapse>
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