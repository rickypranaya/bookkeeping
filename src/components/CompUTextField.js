
import React from "react"
import "../static/components.css"

export default function CompUTextField({alignRight,error, onFocus, onBlur, label, placeholder, value, onChange, onSubmit}) {
    
    return (
        <div className= "field">
            {label && 
            <div className = "field-title">
                {label}
            </div>
            }   
            <input
                placeholder={placeholder}
                className="field-input"
                type="text"
                value={value}
                onChange={onChange}
                onSubmit={onSubmit}
                style={{textAlign: alignRight? 'end' : 'start',  outlineColor: error? 'red': "var(--color-1)"}}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </div>
    )
}