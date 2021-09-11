import React from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <nav className="navbar bg-dark text-white flex-md-nowrap p-0 shadow">

            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Tasks</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/Leads">Leads</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/Realtors">Realtors</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/Calculators">Calculators</Link>
                </li>
            </ul>
        </nav>
    )
}

