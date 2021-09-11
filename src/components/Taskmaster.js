import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./loanpartner/Login"
import { Register } from "./loanpartner/Register"

export const Taskmaster = () => (
    <>
        <Route
            render={() => {
                if (sessionStorage.getItem("taskmaster_loanpartner")) {
                    return (
                        <>
                            <NavBar />
                            <ApplicationViews />
                        </>
                    )
                } else {
                    return <Redirect to="/login" />
                }
            }}
        />

        <Route path="/login">
            <Login />
        </Route>
        <Route path="/register">
            <Register />
        </Route>

    </>
)