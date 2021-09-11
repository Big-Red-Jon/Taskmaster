import React from "react"
import { Route } from "react-router-dom"
//LEADS
import { LeadProvider } from "./lead/LeadProvider"
import { LeadList } from "./lead/LeadList"
import { LeadDetail } from "./lead/LeadDetail"
import { LeadForm } from "./lead/LeadForm"
import { LeadSearch } from "./lead/LeadSearch"
//REALTORS
//Tasks
import { TaskProvider } from "./task/TaskProvider"
import { TaskList } from "./task/TaskList"
import { TaskDetail } from "./task/TaskDetail"
// import { TaskForm } from "./task/TaskForm"
import { TaskSearch } from "./task/TaskSearch"
//Calculator

export const ApplicationViews = () => {
    return (
        <>
            <LeadProvider>
                <TaskProvider>
                    <Route exact path="/">
                        <TaskSearch />
                        <TaskList />
                    </Route>
                    <Route path="/leads/detail/:leadId(/d+)">
                        <TaskDetail />
                    </Route>



                    <Route exact path="/leads">
                        <LeadSearch />
                        <LeadList />
                    </Route>
                    <Route path="/leads/detail/:leadId(/d+)">
                        <LeadDetail />
                    </Route>
                    <Route path="/leads/edit/:articleId(/d+)">
                        <LeadForm />
                    </Route>
                    <Route path="/leads/create">
                        <LeadForm />
                    </Route>
                </TaskProvider>
            </LeadProvider>
        </>
    )
}