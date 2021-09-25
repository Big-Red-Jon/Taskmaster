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
import { RealtorForm } from "./realtor/RealtorForm"
import { RealtorSearch } from "./realtor/RealtorSearch"
//Tasks
import { TaskProvider } from "./task/TaskProvider"
import { TaskList } from "./task/TaskList"
import { TaskDetail } from "./task/TaskDetail"
import { TaskForm } from "./task/TaskForm"
import { TaskSearch } from "./task/TaskSearch"
//Calculator
import { PropertyTaxProvider } from "./propertytax/PropertyTaxProvider"
import { PropertyTaxList } from "./propertytax/PropertyTaxList"
import { PropertyTaxDetail } from "./propertytax/PropertyTaxDetail"
import { PropertyTaxForm } from "./propertytax/PropertyTaxForm"
//Documents
import { DocumentProvider } from "./documents/DocumentProvider"
import { DocumentList } from "./documents/DocumentList"
import { DocumentDetail } from "./documents/DocumentDetail"
import { DocumentForm } from "./documents/DocumentForm"
import { DocumentSearch } from "./documents/DocumentSearch"

export const ApplicationViews = () => {
    return (
        <>
            <LeadProvider>
                <TaskProvider>
                    <RealtorProvider>
                        <DocumentProvider>
                            <PropertyTaxProvider>
                                <Route exact path="/">
                                    <TaskSearch />
                                    <TaskList />
                                </Route>
                                <Route path="/tasks/detail/:leadId(/d+)">
                                    <TaskDetail />
                                </Route>
                                <Route path="/tasks/edit/:taskId(\d+)">
                                    <TaskForm />
                                </Route>
                                <Route path="/tasks/create">
                                    <TaskForm />
                                </Route>

                                <Route exact path="/realtors">
                                    <RealtorSearch />
                                    <RealtorList />
                                </Route>
                                <Route path="/realtors/detail/:realtorId(\d+)">
                                    <RealtorDetail />
                                </Route>
                                <Route path="/realtors/edit/:realtorId(\d+)">
                                    <RealtorForm />
                                </Route>
                                <Route path="/realtors/create">
                                    <RealtorForm />
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

                                <Route exact path="/documents">
                                    <DocumentSearch />
                                    <DocumentList />
                                </Route>
                                <Route path="/documents/detail/:documentId(\d+)">
                                    {/* <DocumentList /> */}
                                    <DocumentDetail />
                                </Route>
                                <Route path="/documents/edit/:documentId(\d+)">
                                    <DocumentForm />
                                </Route>
                                <Route path="/documents/create">
                                    <DocumentForm />
                                </Route>

                                <Route exact path="/Calculators">
                                    <PropertyTaxList />
                                </Route>
                                <Route exact path="/Calculators/:County/:City">
                                    <PropertyTaxDetail />
                                </Route>

                                <Route path="/Calculators/create">
                                    <PropertyTaxForm />
                                </Route>
                            </PropertyTaxProvider>
                        </DocumentProvider>
                    </RealtorProvider>
                </TaskProvider>
            </LeadProvider>
        </>
    )
}