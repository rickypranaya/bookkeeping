
import { Route, Switch, useLocation, useHistory } from "react-router-dom"
import React, {useEffect} from "react"


// Utilities
import CompUDrawer from "./components/CompUDrawer"
import CompUHeader from "./components/CompUHeader"
import PageUMain from "./pages/PageUMain"

// Page specific
import PageSet from "./pages/PageSet"
import PageDash from "./pages/PageDash"
import PageAccCoa from "./pages/PageAccCoa"
import PageExpExpenses from "./pages/PageExpExpenses"
import PageExpSupplier from "./pages/PageExpSupplier"
import PageIncInvoices from "./pages/PageIncInvoices"
import PageIncCustomer from "./pages/PageIncCustomer"
import PageIncPnS from "./pages/PageIncPnS"
import PageRepBalanceSheet from "./pages/PageRepBalanceSheet"
import PageRepIncomeStatement from "./pages/PageRepIncomeStatement"
import PageRepCashFlow from "./pages/PageRepCashFlow"

import "./index.css";



// --------------------
// Nested tabs
// --------------------
const tabsAcc = [
    { name: "Chart of Accounts", id: "coa", component: <PageAccCoa /> }
]

const tabsExp = [
    { name: "Expenses", id: "expenses", component: <PageExpExpenses /> },
    { name: "Supplier", id: "supplier", component: <PageExpSupplier /> }
]

const tabsInc = [
    { name: "Invoices", id: "invoices", component: <PageIncInvoices /> },
    { name: "Customer", id: "customer", component: <PageIncCustomer /> },
    { name: "Inventory", id: "pns", component: <PageIncPnS /> }
]

const tabsRep = [
    { name: "Balance Sheet", id: "balance_sheet", component: <PageRepBalanceSheet /> },
    { name: "Income Statement", id: "income_statement", component: <PageRepIncomeStatement />  },
    { name: "Cash Flow Statement", id: "cf_statement", component: <PageRepCashFlow /> }
]



export default function App()
{
    const location = useLocation()
    let history = useHistory()

    useEffect(() => {
        history.push("/dashboard")
    },[]);

    return (
  
        <div className="container">
            {/* Fix Drawer */}
            <CompUDrawer />

            <div className="container-right">
                {/* Fix header
                <CompUHeader /> */}

                {/* All the routes */}
                <Switch>
                    <Route exact path="/dashboard" component={PageDash} />
                    
                    <Route  path="/account">
                        <PageUMain tabs={tabsAcc} />
                    </Route>

                    <Route  path="/expense">
                        <PageUMain tabs={tabsExp} />
                    </Route>

                    <Route  path="/income">
                        <PageUMain tabs={tabsInc} />
                    </Route>

                    <Route  path="/reports">
                        <PageUMain tabs={tabsRep} />
                    </Route>

                    <Route  path="/settings" component={PageSet} />

                </Switch>
            </div>
        </div>
    )
}

