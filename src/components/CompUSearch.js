
import React,{useState} from "react"
import { FiSearch } from 'react-icons/fi'
import "../static/components.css"

export default function CompUSearch({onChange, onSubmit}) {

    const [onFocus, setOnFocus]= useState(false)
    
    return (
        // <form onSubmit = {onSubmit}> 

    <div className="search" style={{border: onFocus && "2px solid var(--color-1)", boxSizing:'border-box'}}>
        <FiSearch color="#ACACAC"/>
            <input
            className ='search-input'
            type="text"
            placeholder="Search"
            onChange={onChange}
            onFocus={
            (e)=>{setOnFocus(true)}
            }
            onBlur={
            (e)=>{setOnFocus(false)}
            }
            />
    </div>
    // </form>

    )
}