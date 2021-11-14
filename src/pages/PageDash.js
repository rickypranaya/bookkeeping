
import React from "react"

import CompDashAction from "../components/CompDashAction"
import CompDashOverview from "../components/CompDashOverview"
import "../static/pages.css"

export default function PageDash()
{
    return (
        <>
            <div className="page-2">
                <CompDashAction />
                <CompDashOverview />
            </div>
        </>
    )
}
