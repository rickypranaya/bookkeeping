
import React from "react"

import "../static/components.css"

export default function CompUSecondaryButton({label, onClick})
{
    return (
        <button onClick={onClick} id="secondaryButton">
            {label}
        </button>
    )
}
