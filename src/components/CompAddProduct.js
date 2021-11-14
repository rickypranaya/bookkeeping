
import React, {useState} from "react"
import "../index.css"
import CompUSelect from "./CompUSelect"
import CompUTextField from "./CompUTextField"
import CompUMainButton from "./CompUMainButton"
import placeholder from "../../assets/images/image_placeholder.jpg"
const { ipcRenderer } = window.require('electron');

export default function CompAddProduct(props) {
    const [type, setType] = useState('product')
    const [file, setFile] = useState('')
    const [name, setName] = useState('')
    const [sku, setSku] = useState('')
    const [description, setDescription] = useState('')
    const [qty, setQty] = useState('')
    const [cost, setCost] = useState('')
    const [imagePath, setImagePath] =useState('')

    const  handleChange=(event)=> {
        setImagePath(event.target.files[0].path)
        setFile(URL.createObjectURL(event.target.files[0]))
    }

    //handling cost input
    const [costTemp, setCostTemp]= useState('0.00')
    const _handlingInput=(number) =>{
       let num = number.replace(/[^.0-9]/g, '')
       if (num.startsWith('.')) {
        setCostTemp('')
       } else {
            if ((num.split(".").length - 1) <= 1){
                setCostTemp(num)
                let bal = parseFloat(Number(num)).toFixed(2)
                setCost(bal)
            }
       } 
      }

    //handling qty input
    const _handlingQtyInput=(number) =>{
       let string = (number.replace(/[^0-9]/g, ''))
       setQty(string)
      }


    const onSave =() => {
        // console.log(type)
        // console.log(typeof(file))
        console.log(file)
        // console.log(name)
        // console.log(sku)
        // console.log(description)
        // console.log(qty)
        // console.log(cost)

        let body = {
            type : type,
            image : imagePath,
            name : name,
            sku : sku,
            description : description,
            qty : qty,
            cost : cost
        }

        ipcRenderer.send('insert_inventory', body )
            ipcRenderer.on('insert_inventory_reply', (event, arg) => {
                console.log(arg)
                props.closeModal(false)
                props.updateData()
            })
    }

    return (
    <div className="addAccount">
        <div className="title">Add Product/Service</div>

        <input checked={type=='product'} onChange={(e)=>{setType(e.currentTarget.value)}} type="radio" value="product" name="product" /> Product 
        <input checked={type=='service'} onChange={(e)=>{setType(e.currentTarget.value)}} type="radio" value="service" name="service" /> Service
        
        <div style={{marginTop:'20px', display:'flex', flexDirection:'row'}}>
        <label class="btn btn-default fileLabel" data-toggle="tooltip" data-placement="top" title="Add Image">
            <img
            // for="get-image"
            //  onClick={()=>{input.click()}}
             style={{objectFit:'cover', width:'100px', height:'100px', borderRadius:'10px', cursor:"pointer"}} src={file? file : placeholder} alt="placeholder"/>
             <input id="get-image" type="file" name="file" onChange={handleChange} accept="image/*" style={{visibility:"hidden"}}/>
             </label>
        </div>

        <CompUTextField onChange={(e)=>{setName(e.target.value)}} label="Name"/>
        <CompUTextField onChange={(e)=>{setSku(e.target.value)}}  label="SKU"/>
        <CompUTextField onChange={(e)=>{setDescription(e.target.value)}} label="Description"/>

        <div style={{display:'flex', flexDirection:'row'}}>
            <CompUTextField value={qty} onChange={(e)=>{_handlingQtyInput(e.target.value)}} label="Qty"/>

            <CompUTextField 
                alignRight={true} 
                value={costTemp} 
                label="Cost" 
                onChange={(e)=>{_handlingInput(e.target.value)}} 
                onFocus={()=>{setCostTemp('')}} 
                onBlur={()=>{ 
                    if (cost.length>6 ){
                        if(cost.length >9){
                            setCostTemp('$'+cost.slice(0,-9)+','+cost.slice(-9,-6)+','+cost.slice(-6))
                        }else {
                            setCostTemp('$'+cost.slice(0,-6)+','+cost.slice(-6))
                        }
                    } else {
                        setCostTemp('$'+cost)
                    } 
                }
                }
            />       
        </div>
        
        <div className="addAccount-button">   
            <CompUMainButton onClick={onSave} label="Save"/>
        </div>
    </div>
    )
}