import React from "react"
import "../static/components.css"
import Select from 'react-select'

  const selectStyles ={
    control: (base) => ({
        ...base,
        minWidth:'10vw',
        minHeight: 33,
        display : 'flex',
        alignItems:'center',
        justifyContent:'center',
        borderColor:"#b3b3b3",
        borderRadius:'5px',
        backgroundColor:'null',
        margin:'5px 0'
      }),
      dropdownIndicator: (base) => ({
        ...base,
        paddingTop: 0,
        paddingBottom: 0,
      }),
      clearIndicator: (base) => ({
        ...base,
        paddingTop: 0,
        paddingBottom: 0,
      }),
     input: (provided, state) => ({
        ...provided,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        display : 'flex',
        alignItems:'center',
        padding: 0,
        margin: 0,
      }),
      option: (provided, state) => ({
         ...provided,
         padding: "5px",
         zIndex:1001,
         fontSize:'14px'
       }),
       singleValue: (provided, state) => ({
        ...provided,
        display : 'flex',
        alignItems:'center',
        justifyContent:'center',
        alignItems:'center',
        padding: 0,
        margin: 0,
      }),
      placeholder: (provided, state) => ({
        ...provided,
        color:'#b1bac4',
        padding: 0,
        display:'flex',
      }),
      menuPortal: base => ({ ...base, zIndex: 9999 })
   };

export default function CompUSelect({label, options, placeholder, onChange, defaultValue}) {
    
    return (
        <div className="select">
        {label && <div style={{fontSize:'14px', marginTop:'15px'}}> {label} </div>}
        <Select 
            placeholder={placeholder}
            menuPortalTarget={document.body}
            value={defaultValue?defaultValue : ""}
            className="mySelect-box"
            classNamePrefix="mySelect"
            styles={selectStyles}
            // isClearable={true}
            options={options}
            onChange={onChange}
        />
        </div>
    )
}