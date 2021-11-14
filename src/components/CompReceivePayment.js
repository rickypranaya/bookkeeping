
import React, {useState}from "react"
import "../index.css"
import CompUSelect from "./CompUSelect"
import CompUTextField from "./CompUTextField"
import CompUMainButton from "./CompUMainButton"

export default function CompReceivePayment() {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]

      const paymentOptions = [
        { value: 'cash', label: 'Cash' },
        // { value: 'cheque', label: 'Cheque' },
        { value: 'credit', label: 'Credit Card' }
      ]

      const [isChecked, setIsChecked] = useState(false)

    
    return (
    <div className="receivePayment" style={{padding:'20px'}}>
        <div className="title">Receive Payment</div>
        <CompUTextField label="Amount Received" placeholder="$"/>
        <CompUSelect label="Customer" placeholder="choose a customer" options={options}/>

        <div style={{marginTop:'10px'}}>
            <input type="checkbox" id="scales" name="scales" onChange={(e)=>{setIsChecked(e.target.checked)}} />
            <label style={{color:'grey', fontSize:'13px'}} for="scales">Add from Invoice</label>
        </div>
        
        {isChecked && <CompUSelect label="Invoice no." options={options} placeholder="find invoice" />}

        <CompUSelect label="Deposit To" placeholder="select your account"/>

        <div style={{display:'flex', flexDirection:'row'}}>
            <CompUSelect label="Payment By" placeholder="select payment method" options={paymentOptions}/>         
            <CompUTextField label="Payment Date" placeholder="15/04/2000"/>
        </div>

        <CompUTextField label="Notes" placeholder="optional"/>
        
        <div className="addAccount-button">   
            <CompUMainButton label="Save"/>
        </div>
    </div>
    )
}