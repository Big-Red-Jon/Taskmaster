import React from "react"
import { Route } from "react-router-dom"
//LEADS
import { LeadProvider } from "./lead/LeadProvider"
import { LeadList } from "./lead/LeadList"
import { LeadDetail } from "./lead/LeadDetail"
import { LeadForm } from "./lead/LeadForm"
import { LeadSearch } from "./lead/LeadSearch"
//REALTORS
import { RealtorProvider } from "./realtor/RealtorProvider"
import { RealtorList } from "./realtor/RealtorList"
import { RealtorDetail } from "./realtor/RealtorDetail"
// import { RealtorForm } from "./realtor/RealtorForm"
import { RealtorSearch } from "./realtor/RealtorSearch"
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
                    <RealtorProvider>
                        <Route exact path="/">
                            <TaskSearch />
                            <TaskList />
                        </Route>
                        <Route path="/tasks/detail/:leadId(/d+)">
                            <TaskDetail />
                        </Route>

                        <Route exact path="/realtors">
                            <RealtorSearch />
                            <RealtorList />
                        </Route>
                        <Route path="/realtors/detail/:realtorId(\d+)">
                            <RealtorDetail />
                        </Route>

                        <Route exact path="/leads">
                            <LeadSearch />
                            <LeadList />
                        </Route>
                        <Route path="/leads/detail/:leadId(\d+)">
                            <LeadDetail />
                        </Route>
                        <Route path="/leads/edit/:leadId(\d+)">
                            <LeadForm />
                        </Route>
                        <Route path="/leads/create">
                            <LeadForm />
                        </Route>
                    </RealtorProvider>
                </TaskProvider>
            </LeadProvider>
        </>
    )
}