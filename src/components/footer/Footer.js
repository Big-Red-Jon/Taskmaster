import React from "react"
import "./Footer.css"
import { Card } from "react-bootstrap"
import { Button } from "react-bootstrap"


export const Footer = () => {
    return (
        <>
            <div className="Contact" >
                <div className="footer_bottom">
                    <Card className="Card" style={{ width: '25rem' }}>
                        <Card.Img variant="top" src="https://interlinc.mortgagebigger.co/images/staff/brooks_jonathan_wayne-1610057298.jpg" alt="Jon Brooks Headshot" />
                        <Card.Body>
                            <Card.Title>Jon Brooks</Card.Title>
                            <Card.Text>
                                Licensed Loan Partner
                                NMLS #: 1538614<br />
                                KY Lic# MC394813 <br />
                                TN Lic# 135190 <br />
                                <a href="mailto:jbrooks@lincloan.com">jbrooks@lincloan.com</a> <br />
                                615-577-5626 - p <br />
                            </Card.Text>
                            {/* <Button variant="primary">Go somewhere</Button> */}
                        </Card.Body>
                    </Card>
                    <div className="container">
                        <p>Copyright 2021 InterLinc Mortgage Services, LLC. All Rights Reserved. NMLS # 205696, <a href="https://www.nmlsconsumeraccess.org/" target="_blank">NMLS Consumer Access</a>.</p>
                        <p>Tennessee Mortgage License #114460. Kentucky Mortgage Company License #MC94322. InterLinc is an Equal Housing Lender. DISCLAIMER: This is not a commitment to lend. Credit and collateral are subject to approval.  Other restrictions may apply.  Programs, rates, terms and conditions are subject to change without notice.</p>
                    </div>

                </div>
            </div>
        </>
    )
}
