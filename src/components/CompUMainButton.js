import React from "react"
import "../static/components.css"

export default function CompUMainButton({label, onClick})
{
    return (
        <button 
        id="mainButton"
        onClick={onClick}
        >
            {label}
        </button>
    )
}