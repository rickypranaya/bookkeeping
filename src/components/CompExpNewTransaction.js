
import React from "react"

import { RiArrowDownSLine } from "react-icons/ri"
import "../static/components.css"

export default function CompExpNewTransaction()
{
    return (
        <button className="exp-newtransaction button button-round">
            New Transaction&nbsp;<RiArrowDownSLine />
        </button>
    )
}