
import React from "react"
import PageUTemplate from "./PageUTemplate"
import CompUSelect from "../components/CompUSelect"
import CompUTextField from "../components/CompUTextField"
import CompUMainButton from "../components/CompUMainButton"

import "../static/pages.css"

export default function PageRepCashFlow()
{
    return (
        <PageUTemplate
        tl={
            <>
                <div className="main-select"> <CompUSelect label='Report Period' /> </div>
                <div className="main-select"> <CompUTextField label ='From' placeholder="05/08/2020" /> </div>
                <div className="main-select"> <CompUTextField label ='To' placeholder="05/08/2021" /> </div>
            </>
        } 
        tr={
            <>
                <CompUMainButton label="Run Report"/>
            </>
        }
        body={
            <>
                <div className="report-body">

                    {/* Cash flow goes here */}
                    
                </div>
            </>
        } />
    )
}
