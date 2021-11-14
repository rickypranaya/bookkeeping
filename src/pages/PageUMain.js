
import React, { useEffect } from "react"
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom"

import CompUSection from "../components/CompUSection"
import "../static/pages.css"


// Page containing Section + main content
export default function PageUMain({ tabs })
{
    const { url } = useRouteMatch()

    return (
        <>
            <CompUSection tabs={tabs} />

            <Switch>
                <Route path={`${url}/:tabId`}>
                    <PageMainRoutes tabs={tabs} />
                </Route>
            </Switch>
        </>
    )
}


// Route split
function PageMainRoutes({ tabs }) {
    const { tabId } = useParams()
    const tab = tabs.find(({ id }) => id === tabId)
    return tab.component
}
