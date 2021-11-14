import React , {useMemo, useState} from "react"
import "../static/components.css"
import CompUTextField from "./CompUTextField"
import CompUSelect from "./CompUSelect"
import { BsFillTrashFill } from 'react-icons/bs'
import { IoAddCircle } from 'react-icons/io5'
import { useTable } from "react-table"
import CompUMainButton from "./CompUMainButton"
import CompUSecondaryButton from "./CompUSecondaryButton"

export default function CompMakePayment() {
    const [isChecked, setIsChecked] = useState(false)
    const [file, setFile] = useState()


        const  handleChange=(event)=> {
        setFile(URL.createObjectURL(event.target.files[0]))
        }

    const [product, setProduct] = useState(
        [{
            id : 1,
            product_service : '',
            description :'',
            quantity: '',
            rate: '',
            amount:'',
        }]
        )
    const [temp, setTemp] =useState({})
    const [counter, setCounter] = useState(1)
    const [deleted, setDeleted] = useState()

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
            // value={props.value}
            onChange={(val)=>{
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
            // value={props.value}
            onChange={(val)=>{
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
            // value={props.value}
            onChange={(val)=>{
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
            // value={props.value}
            onChange={(val)=>{
            }}
            />
        },
        {
            Header : 'AMOUNT',
            accessor : 'amount',
            Cell: props =>  
            <input 
            className='invoice-field'
            style={{width:'7vw'}}
            type="text"
            // value={props.value}
            onChange={(val)=>{
            }}
            />
        }
    ]

    let DATA =[
        {
            id : '1',
            product_service : '',
            description :'',
            quantity: '',
            rate: '',
            amount:'',
        }
    ]
    
    

    const [data, setData] = useState(product)
    const columns = useMemo(()=> COLUMNS, [])
    const [total, setTotal] = useState('$0.00')
    const [due, setDue] = useState('$0.00')

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

    
    
    return (
    <div className="invoice">
        <div className="invoice-top">
            <div className="title">New Transaction</div>

            <label style={{cursor:'pointer'}} class="btn btn-default fileLabel" data-toggle="tooltip" data-placement="top" title="import invoice">
             <span style={{color:'var(--color-1)'}} for="scales">import invoice</span>

             <input id="get-image" type="file" name="file" onChange={handleChange}  style={{visibility:'hidden', position:'absolute',left:0, cursor:'pointer'}}/>
        </label>


            <div style={{display:'flex', flexDirection:'row'}}>
                <div style={{width:'20vw'}}>
                    <CompUSelect label="Payee" placeholder="Who did you pay?"/>
                    <CompUSelect label="From Account" placeholder="select your account"/>                          
                </div>
                <div style={{width:'15vw'}}>
                    <CompUSelect label="Payment By" />
                    <CompUTextField label="Payment Date" placeholder="05/19/2021"/>                           
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
            <IoAddCircle size={25} color="#6FB01C" onClick={()=>{addRow()}}/>

            <div style={{fontWeight:'500', textAlign:'right'}}>Total {<span style={{paddingLeft:'30px'}}> {total} </span>}</div>

            <div style={{display:'flex', flexDirection:'row'}}>
                <div>
                    <div>Notes</div>
                    ​<textarea 
                        className="invoice-textarea"
                        id="txtArea" 
                        rows="4" 
                        cols="50" 
                        placeholder="Optional"
                        />
                </div>
                <div style={{display:'flex',alignSelf:'flex-end', flex:1, justifyContent:'flex-end'}}>
                    <CompUMainButton label="Save"/>
                </div>
            </div>
        </div>
    </div>
    )
}