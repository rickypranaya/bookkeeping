import React , {useMemo, useState, useEffect} from "react"
import "../static/components.css"
import CompUTextField from "./CompUTextField"
import CompUSelect from "./CompUSelect"
import { BsFillTrashFill } from 'react-icons/bs'
import { IoAddCircle } from 'react-icons/io5'
import { useTable } from "react-table"
import CompUMainButton from "./CompUMainButton"
import CompUSecondaryButton from "./CompUSecondaryButton"
import { PdfInvoice } from "./CompUPdf"
import { useHistory } from "react-router-dom"
import { setAppElement } from "react-modal"
const { ipcRenderer } = window.require('electron');

export default function CompIncInvoice(props) {

    const options = [
        {value:0, label:'Due on receipt'},
        {value:7, label:'Net 7'},
        {value:21, label:'Net 21'},
        {value:30, label:'Net 30'},
    ]

    const COLUMNS =[
        {
            Header : '#',
            accessor : 'id',
            Cell: props =>  
            <input 
            className='invoice-field'
            style={{width:'3vw'}}
            type="text"
            value={props.value}
            // value={props.value}
            onChange={(val)=>{
            }}
            />
        },
        {
            Header : 'PRODUCT / SERVICE',
            accessor : 'product_service',
            Cell: props =>  
            <input 
            className='invoice-field'
            style={{width:'15vw'}}
            type="text"
            defaultValue={data[props.row.id].product_service}
            onChange={(val)=>{
                data[props.row.id].product_service = val.target.value
            }}
            onBlur={(val)=>{

            }}
            />
        },
        {
            Header : 'DESCRIPTION',
            accessor : 'description',
            Cell: props =>  
            <input 
            className='invoice-field'
            style={{width:'15vw'}}
            type="text"
            defaultValue={data[props.row.id].description}
            onChange={(val)=>{
                data[props.row.id].description = val.target.value
            }}
            onBlur={(val)=>{
                
            }}
            />
        },
        {
            Header : 'QTY',
            accessor : 'quantity',
            Cell: props =>  
            <input 
            className='invoice-field'
            style={{width:'5vw'}}
            type="text"
            defaultValue={data[props.row.id].quantity}
            onChange={(val)=>{
                let typed = val.target.value
                let a = typed.replace(/[^.0-9]/g, '')
                data[props.row.id].quantity = (a)
            }}
            onBlur={(val)=>{
                data[props.row.id].amount  = (data[props.row.id].rate * data[props.row.id].quantity )
                _updateState()
            }}
            />
        },
        {
            Header : 'RATE',
            accessor : 'rate',
            Cell: props =>  
            <input 
            className='invoice-field'
            style={{width:'5vw'}}
            type="text"
            defaultValue={data[props.row.id].rate}
            onChange={(val)=>{
                let typed = val.target.value
                let a = typed.replace(/[^.0-9]/g, '')
                data[props.row.id].rate = a
            }}
            onBlur={(val)=>{
                data[props.row.id].amount  = (data[props.row.id].rate * data[props.row.id].quantity )
                _updateState()
            }}
            />
        },
        {
            Header : 'AMOUNT',
            accessor : 'amount',
            Cell: props =>  
            <input 
            className='invoice-field'
            style={{width:'7vw', textAlign:'right'}}
            type="text"
            defaultValue={_renderDollar(data[props.row.id].amount)}
            onChange={(val)=>{
                data[props.row.id].amount = val.target.value
            }}
            onBlur={(val)=>{
                _updateState()
            }}
            />
        }
    ]
    
    const [data, setData] = useState(
    [{
        id : 1,
        product_service : '',
        description :'',
        quantity: '',
        rate: '',
        amount:'',
    }]
    )
    
    //======== INITIALIZATION ==================//
    const columns = useMemo(()=> COLUMNS, [data])
    const [counter, setCounter] = useState(1)
    const [deleted, setDeleted] = useState()
    // const [data, setData] = useState(product)
    const [total, setTotal] = useState('$0.00')
    const [due, setDue] = useState('$0.00')
    const [term, setTerm] = useState({value:'net_30', label:'Net 30'})
    const [customerOptions, setCustomerOpt] = useState([])
    const [customer, setCustomer] = useState('')

    const [b_street, setBStreet] = useState ('')
    const [b_no, setBNo] = useState ('')
    const [b_country, setBCountry] = useState ('')
    const [b_postcode, setBPostcode] = useState ('')
    const [email, setEmail] = useState('')
    const [inv_date, setInvDate] = useState('')
    const [due_date, setDueDate] = useState('')
    const [notes, setNotes] = useState('')

    // ============================================//

    const _renderDollar = (number) =>{
        let n = number
        let balance = n.toString()
        if (balance.length>3 ){
            if(balance.length >6){
                return('$'+balance.slice(0,-6)+','+balance.slice(-6,-3)+','+balance.slice(-3))
            }else {
                return('$'+balance.slice(0,-3)+','+balance.slice(-3))
            }
        } else {
            return('$'+balance)
        } 
    }

    const _updateState= () =>{
        setData([...data])
        let tmp = [...data]
        let tot= 0
        let bal_due = 0

        tmp.map((e)=>{
            tot = tot + e.amount
        })

        setTotal(_renderDollar(tot)+".00")
        setDue(_renderDollar(tot)+".00")
    }

    useEffect(() => {
        let options=[]

        ipcRenderer.send('read_customer', 'read' )
        ipcRenderer.on('read_customer_reply', (event, arg) => {
            arg.map((e)=>{
                options = [...options, {value: e._id, label : e.name, data: e}]
            })
            setCustomerOpt(options)
          })

        setInvDate(getDate(0))
        setDueDate(getDate(30))
        console.log('oi')
    },[]);


    const tableInstance = useTable({
        columns,
        data
    })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    const addRow =()=>{
        let id = counter+1
        setCounter(id)
        let TEMP =
        {
            id : id,
            product_service : '',
            description :'',
            quantity: '',
            rate: '',
            amount:'',
        }

        setData([...data, TEMP ])
    }

    const deleteRow =(id)=>{
        let idNum = Number(id)
        let intID = idNum+1
        let myArr = [...data]
        var index = myArr.findIndex(function(o){
            return o.id === intID;
        })
        if (index !== -1) myArr.splice(index, 1);

        for (let i = idNum; i< myArr.length; i++){
            myArr[i].id = i+1
        }
        setData(myArr)
        setCounter(counter-1)
    }

    const ExportPdf = () => {
        let body = {
            customer : customer.data,
            term : term.label,
            invoice_date : inv_date,
            due_date : due_date,
            total : total,
            due : due,
            notes : notes,
            products : data
        }
        PdfInvoice(body)
    }

    const _handleCustomerSelect = (val)=>{
        setCustomer(val)
        setBStreet(val.data.b_street)
        setBNo(val.data.b_no)
        setBCountry(val.data.b_country)
        setBPostcode(val.data.b_postcode)
        setEmail(val.data.email)
    }

    const _handleTermSelect = (val)=>{
        setTerm(val)
        setDueDate(getDate(val.value))
    }

    // 0 -> today
    // 7 -> net 7
    // 30 -> net 30, etc
    const getDate = (arg)=>{
        let now = new Date()
        now.setDate(now.getDate() + arg);
        return (now.getDate() +'/'+ (now.getMonth()+1)+"/"+ now.getFullYear())
    }

    const onSave= () =>{
        if (total == '$0.00'){
            alert('Please add product')
        } else {
            let body = {
                customer : customer.value,
                term : term.value,
                invoice_date : inv_date,
                due_date : due_date,
                total : total,
                due : due,
                notes : notes,
                products : JSON.stringify(data)
            }
            console.log(body)
        }
    }
    
    return (
    <div className="invoice">
        <div className="invoice-top">
            <div style={{display:'flex', flexDirection:'row', alignItems:'center',justifyContent:'flex-start',}}>
                <span className="title">Invoice no.</span> 
                <CompUTextField value={1003}/>
            </div>

            <div style={{display:"flex", flexDirection:'row'}}>
                <div style={{maxWidth:'20vw'}}>
                    <CompUSelect defaultValue={customer} onChange={_handleCustomerSelect} options={customerOptions} label="Customer" placeholder="select a customer"/>
                    <div style={{padding:'1px 0'}}>

                        <CompUTextField value={b_street} onChange={(e)=>{setBStreet(e.target.value)}} label="Billing Address" placeholder="Street name"/>
                        <CompUTextField value={b_no} onChange={(e)=>{setBNo(e.target.value)}} placeholder="Building name / apartment no."/>
                        <div style={{display:"flex", flexDirection:'row', justifyContent:'space-between'}}>
                            <CompUTextField value={b_country} onChange={(e)=>{setBCountry(e.target.value)}} placeholder="Country"/>
                            <CompUTextField value={b_postcode} onChange={(e)=>{setBPostcode(e.target.value)}} placeholder="Postcode"/>
                        </div>

                    </div>
                </div>
                <div style={{maxWidth:'30vw'}}>
                    <div style={{maxWidth:'20vw'}}>
                    <CompUTextField value={email} onChange={(e)=>{setEmail(e.target.value)}} label="Customer Email" />
                    </div>
                    <div style={{display:"flex", flexDirection:'row', justifyContent:'space-around', alignItems:'flex-start'}}>
                        
                        <CompUSelect label="Terms" defaultValue={term} onChange={_handleTermSelect} options={options}/>
                        <CompUTextField value={inv_date} label="Invoice Date" placeholder="05/19/2021"/>
                        <CompUTextField value={due_date} label="Due Date" placeholder="06/19/2021"/>
                    
                    </div>
                </div> 
            </div>
        </div>

        <div className="invoice-bottom">
            <div className="invoice-table-div">
            <table className="invoice-table"{...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup)=>(
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column)=>(
                                    <th {...column.getHeaderProps()}>{column.render('Header')} </th>
                            ))}
                            <th></th>
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row)=>{
                            prepareRow(row)
                            return(
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell)=>{
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')} </td>
                                    })}
                                    <td> <div onClick={()=>{deleteRow(row.id)}}><BsFillTrashFill color='grey'/></div></td>
                                </tr>
                            )
                    })}
                </tbody>
            </table>
            </div>
            <IoAddCircle size={25} color="var(--color-1)" onClick={()=>{addRow()}}/>

            <div style={{fontWeight:'500', textAlign:'right'}}>Total {<span style={{paddingLeft:'30px'}}> {total} </span>}</div>
            <div style={{fontWeight:'500', textAlign:'right'}}>Balance Due {<span style={{paddingLeft:'30px'}}> {due} </span>}</div>

            <div style={{display:'flex', flexDirection:'row'}}>
                <div>
                    <div>Message on Invoice</div>
                    ​<textarea 
                        onChange={(e)=>{setNotes(e.target.value)}}
                        className="invoice-textarea"
                        id="txtArea" 
                        rows="4" 
                        cols="50" 
                        placeholder="Optional (this will show on invoice)"
                        />
                </div>
                <div style={{display:'flex',alignSelf:'flex-end', flex:1, justifyContent:'flex-end'}}>
                    <span style={{marginRight:'25px'}}> <CompUSecondaryButton label="Export to pdf" onClick={ExportPdf}/> </span>
                    <CompUMainButton onClick={()=>{onSave()}} label="Save"/>
                </div>
            </div>
        </div>
    </div>
    )
}