import React, { useContext } from "react"
import { TaskContext } from "./TaskProvider"
import "./Task.css"

export const TaskSearch = () => {
    const { setSearchTerms } = useContext(TaskContext)

    return (
        <>
            <section className="searchBar">
                Task Search:
                <input type="text"
                    className="input--wider"
                    onKeyUp={(event) => setSearchTerms(event.target.value)}
                    placeholder="Search for a specific task... " />
            </section>
        </>
    )
}
