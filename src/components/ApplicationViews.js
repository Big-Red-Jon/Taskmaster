import React from "react"
import { Route } from "react-router-dom"
//LEADS
import { LeadProvider } from "./lead/LeadProvider"
import { LeadList } from "./lead/LeadList"
import { LeadDetail } from "./lead/LeadDetail"
import { LeadForm } from "./lead/LeadForm"
import { LeadSearch } from "./lead/LeadSearch"
//REALTORS

export const ApplicationViews = () => {
    return (
        <>
            <LeadProvider>
                <Route exact path="/leads">
                    <LeadSearch />
                    <LeadList />
                </Route>
                <Route path="/leads/detail/:leadId(/d+)">
                    <LeadDetail />
                </Route>
                <Route path="/leads/create">
                    <LeadForm />
                </Route>
            </LeadProvider>
        </>
    )
}