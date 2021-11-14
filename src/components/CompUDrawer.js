
import React, { useEffect, useState } from "react"
import { Link, useLocation, useHistory } from "react-router-dom"
import placeholder from "../../assets/images/image_placeholder.jpg"

import { CgArrowsShrinkH, CgArrowsMergeAltH } from "react-icons/cg"
import { RiDashboardFill, RiMoneyDollarBoxFill, RiFileList3Fill,
        RiSurveyFill, RiCalculatorFill, RiSettings4Fill } from "react-icons/ri"
import { MdKeyboardArrowRight } from "react-icons/md"
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai"
import "../static/components.css"

export default function CompUDrawer()
{
    const [collapse, setCollapse] = useState(false);
    const [profile, setProfile] = useState(null);
    const [profileClicked, setProfileClicked] = useState(false);
    const location = useLocation()
    let history = useHistory()

    // Initial highlight button
    useEffect(() => {
        const tabList = document.querySelectorAll(".drawer-tabs-button")
        for (const t of tabList) {

            // Reset all tabs
            if (location.pathname.startsWith(t.id)){
                // t.style.borderLeft="5px solid rgba(0,0,0,0)"
                t.style.backgroundColor = "var(--color-1)" 
                t.style.color ="white"
            } else {
                // t.style.borderLeft="0px solid rgba(0,0,0,0)"
                t.style.backgroundColor = "" 
                t.style.color =""
            }
            
        }
    }, [location]);


    // --------------------
    // Functions
    // --------------------
    function CollapseDrawer(e)
    {
        setCollapse(collapse => !collapse);
        const drawer = document.querySelector(".drawer")
        const tabTexts = document.querySelectorAll(".drawer-tabs-text")
        const tabButtons = document.querySelectorAll(".drawer-tabs-button")
        const collButton = document.querySelector(".drawer-collapse")
        
        // If not yet collapse, shrink it
        if (!collapse)
        {
            // Hide the texts + center the icons + center the collapse button
            Array.from(tabTexts).map(t => t.style.display = "none")
            Array.from(tabButtons).map(b => {
                b.style.paddingLeft = "0px"
                b.style.justifyContent = "space-evenly"
            })
            
            //change collapse button position
            collButton.style.alignSelf="center"
            collButton.style.marginRight="0px"

            // Animation
            drawer.style.minWidth = "60px"
        }

        // Expand it
        else
        {
            Array.from(tabTexts).map(t => t.style.display = "block")
            Array.from(tabButtons).map(b => {
                b.style.paddingLeft = "40px"
                b.style.justifyContent = "flex-start"
            })
            drawer.style.minWidth = "180px";

            //change collapse button position
            collButton.style.alignSelf="flex-end"
            collButton.style.marginRight="15px"
        }
    }



    // --------------------
    // Render
    // --------------------
    return (
        <div className="drawer">
            <div className="drawer-top-half">
            
            {/* Shrink/expand button */}
            <button className="drawer-collapse" onClick={CollapseDrawer}>
                {
                    collapse ?
                    <AiOutlineMenuUnfold size="16" /> :
                    <AiOutlineMenuFold size="16" />
                }
            </button>
            {/* <div style={{borderBottom:'1px solid lightgrey', margin:'15px 0'}}/> */}
            
            {/* Profile Image*/}
            <div className="drawer-profile" onClick={()=>{setProfileClicked(!profileClicked)}}>
                {profile?
                <img className="profile-image-drawer" src={placeholder} alt="placeholder"/>
                :
                <div className="profile-div-drawer">C</div>
                }

                {profileClicked &&
                <div onClick={()=>{setProfileClicked(false)}} style={{background:'transparent', width:'100vw', height:'100vh', position:'absolute', top:0, left:0, cursor:'default'}}>
                    

                <div className='profile-options' style={{left:!collapse? "190px": "70px"}} >
                    <div className='dropdown-list' onClick={()=>{history.push("/settings")}}>
                        Account Settings <MdKeyboardArrowRight size={15}/>
                    </div>
                    <div className='dropdown-list' onClick={()=>{alert('hi')}}>
                        Switch Accounts <MdKeyboardArrowRight size={15}/>
                    </div>
                    <div className='dropdown-list' onClick={()=>{alert('hi')}}>
                        Log Out
                    </div>
                </div> 
                   
                </div>
                }

                <span style={{fontSize:"12px",display: !collapse? "block" : "none"}}>Company Pte.Ltd</span>   
            </div>

            {/* Page tabs */}
            <div className="drawer-tabs">
                <Link to="/dashboard" id="/dashboard" className="drawer-tabs-button">
                    <RiDashboardFill size="24" />
                    <span className="drawer-tabs-text">&nbsp;&nbsp;Dashboard</span>
                </Link>

                <Link to="/account/coa" id="/account" className="drawer-tabs-button">
                    <RiCalculatorFill size="24" />
                    <span className="drawer-tabs-text">&nbsp;&nbsp;Accounts</span>
                </Link>

                <Link to="/income/invoices" id="/income" className="drawer-tabs-button">
                    <RiMoneyDollarBoxFill size="24" />
                    <span className="drawer-tabs-text">&nbsp;&nbsp;Income</span>
                </Link>

                <Link to="/expense/expenses" id="/expense" className="drawer-tabs-button">
                    <RiFileList3Fill size="24" />
                    <span className="drawer-tabs-text">&nbsp;&nbsp;Expense</span>
                </Link>

                <Link to="/reports/balance_sheet" id="/reports" className="drawer-tabs-button">
                    <RiSurveyFill size="24" />
                    <span className="drawer-tabs-text">&nbsp;&nbsp;Reports</span>
                </Link>

                
            </div>
            </div>


            {/* Setting */}
            <Link to="/settings" id="/settings"  className="drawer-tabs-button">
                <RiSettings4Fill size="24" />
                <span className="drawer-tabs-text">&nbsp;&nbsp;Settings</span>
            </Link>

        </div>
    )
}
