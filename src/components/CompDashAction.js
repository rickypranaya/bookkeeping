
import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"

import { RiTruckFill, RiTeamFill, RiArticleFill,
        RiFullscreenFill, RiFullscreenExitFill } from "react-icons/ri"

import{ FaFileInvoice, FaFileInvoiceDollar, FaMoneyBill } from "react-icons/fa"
import{IoIosListBox, IoMdWallet} from "react-icons/io"
import "../static/components.css"


// The action tabs
const actions = [
    { name:"Create Invoice", icon: <FaFileInvoice size="28" /> ,
     link: { 
        pathname: "/income/invoices", 
        state: "invoice" 
      }},
    { name:"New Account", icon: <IoMdWallet size="28" />, link: { 
        pathname: "/account/coa", 
        state: "account" 
      } },
    { name:"Add Supplier", icon: <RiTruckFill size="28" />, link: { 
        pathname: "/expense/supplier", 
        state: "supplier" 
      } },
    { name:"Add Customer", icon: <RiTeamFill size="28" /> , link: { 
        pathname: "/income/customer", 
        state: "customer" 
      }},
    { name:"New Transaction", icon: <FaFileInvoiceDollar size="28" /> , link: { 
        pathname: "/expense/expenses", 
        state: "transaction" 
      }},
    
    { name:"Receive Payment", icon: <FaMoneyBill size="28" /> , link: { 
        pathname: "/income/invoices", 
        state: "receive" 
      }},
    { name:"Add Product/Service", icon: <IoIosListBox size="28" /> ,link: { 
        pathname: "/income/pns", 
        state: "pns" 
      }}

]


export default function CompDashAction()
{
    const [maxActions, setMaxActions] = useState(6);

    // --------------------
    // Functions
    // --------------------
    function CollapseHolder()
    {
        setMaxActions(x => x != 999 ? 999 : 5)
    }


    // --------------------
    // Render
    // --------------------
    return (
        <div className="dash-action">
            {/* Title */}
            <div className="text-title">Quick Actions</div>

            {/* Action tabs */}
            <div className="dash-action-holder">
                {
                    actions.map(({ name, icon, link }, index) => {
                        // Check maximum tabs
                        if (index > maxActions-1) return
                        return (
                            <Link to={link} className="dash-action-item" >
                                <div className="dash-action-item-div"  key={index}>
                                    {icon}
                                    <br/>
                                    <span>{name}</span>
                                </div>
                             </Link>    
                        )
                    })
                }
            </div>

            <div style={{marginTop:'20px', borderBottom:'0.01rem solid #dddddd'}}/>
        </div>
    )
}
