
import React, {useState} from "react"
import "../index.css"
import CompUTextField from "./CompUTextField"
import CompUMainButton from "./CompUMainButton"
const { ipcRenderer } = window.require('electron');

export default function CompAddCustomer({userType, updateData, closeModal}) {
    const [type, setType] = useState('individual')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [notes, setNotes] = useState('')

    //billing address
    const [b_street, setBStreet] = useState('')
    const [b_no, setBNo] = useState('')
    const [b_country, setBCountry] = useState('')
    const [b_postcode, setBPostcode] = useState('')

    //shipping address
    const [c_street, setCStreet] = useState('')
    const [c_no, setCNo] = useState('')
    const [c_country, setCCountry] = useState('')
    const [c_postcode, setCPostcode] = useState('')

    const [isChecked, setIsChecked] = useState(false)

    const onSave=()=>{

        let body ={
            name : name,
            type : type,
            phone : phone,
            email : email,
            notes : notes,
            b_street : b_street,
            b_no: b_no,
            b_country : b_country,
            b_postcode : b_postcode,
            c_street : c_street,
            c_no : c_no,
            c_country : c_country,
            c_postcode : c_postcode,
            address : b_street +" "+ b_no+", "+b_postcode,
            open_balance : "0.00"
        }

        if (userType == "Customer"){
            ipcRenderer.send('insert_customer', body )
            ipcRenderer.on('insert_customer_reply', (event, arg) => {
                console.log(arg)
                closeModal(false)
                updateData()
            })
        } else {
            console.log('1')
            ipcRenderer.send('insert_supplier', body )
            ipcRenderer.on('insert_supplier_reply', (event, arg) => {
                console.log(arg)
                closeModal(false)
                updateData()
            })
        } 
    }

    const _handleChecked = (e)=>{
        setIsChecked(e.target.checked)

        if (e.target.checked ){
            setCStreet(b_street)
            setCNo(b_no)
            setCCountry(b_country)
            setCPostcode(b_postcode)
        }
    }
    
    
    return (
    <div className="addCustomer">
        <div className="title">{"New "+ userType}</div>

        <input checked={type=='individual'} onChange={(e)=>{setType(e.currentTarget.value)}} type="radio" value="individual" name="individual" /> Individual
        <input checked={type=='company'} onChange={(e)=>{setType(e.currentTarget.value)}} type="radio" value="company" name="company" /> Company

        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
            <div style={{width:'17vw', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                <CompUTextField label="Name" onChange={(val)=>{setName(val.target.value)}}/>
                <CompUTextField label="Phone" onChange={(val)=>{setPhone(val.target.value)}}/>
                <CompUTextField label="Email" onChange={(val)=>{setEmail(val.target.value)}}/>
                <CompUTextField label="Notes" placeholder="optional" onChange={(val)=>{setNotes(val.target.value)}}/>
            </div>
            <div style={{width:'20vw'}}>
                <CompUTextField label="Billing Address" placeholder="Street name" onChange={(val)=>{ setIsChecked(false); setBStreet(val.target.value)}}/>
                <CompUTextField  placeholder="Building name / apartment no." onChange={(val)=>{ setIsChecked(false); setBNo(val.target.value)}}/>
                <div style={{display:"flex", flexDirection:'row', justifyContent:'space-between'}}>
                    <CompUTextField  placeholder="Country" onChange={(val)=>{ setIsChecked(false); setBCountry(val.target.value)}}/>
                    <CompUTextField  placeholder="Postcode" onChange={(val)=>{ setIsChecked(false); setBPostcode(val.target.value)}}/>
                </div>

                <CompUTextField label={ <>Shipping Address &nbsp;
                <input type="checkbox" id="scales" name="scales" checked={isChecked} onChange={(e)=>{_handleChecked(e)}} />
                <label style={{color:'grey'}} for="scales">same as billing</label></>} 
                placeholder="Street name"
                onChange={(val)=>{setIsChecked(false); setCStreet(val.target.value)}} value={c_street} />
                
                <CompUTextField  placeholder="Building name / apartment no." onChange={(val)=>{ setIsChecked(false); setCNo(val.target.value)}} value={ c_no}/>
                <div style={{display:"flex", flexDirection:'row', justifyContent:'space-between'}}>
                    <CompUTextField  placeholder="Country"onChange={(val)=>{setIsChecked(false); setCCountry(val.target.value)}} value={c_country} />
                    <CompUTextField  placeholder="Postcode" onChange={(val)=>{setIsChecked(false); setCPostcode(val.target.value)}} value={c_postcode}/>
                </div>

            </div>
        </div>   
        
        <div className="addAccount-button">   
            <CompUMainButton onClick={()=>{onSave()}} label="Save"/>
        </div>
    </div>
    )
}