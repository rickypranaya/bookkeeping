
import React from "react"

import { RiArrowDropDownFill } from "react-icons/ri"
import "../static/components.css"

export default function CompUDrawer()
{
    // --------------------
    // Render
    // --------------------
    return (
        <div className="header">

            <div className="header-button">
                <img className="header-button-image" />
                <span className="header-button-text">Company1 Pte.Ltd</span>
                <RiArrowDropDownFill size="32px" />
            </div>

        </div>
    )
}
