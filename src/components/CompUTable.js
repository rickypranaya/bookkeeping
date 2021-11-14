import React, { useMemo, useState } from "react"
import { useTable } from "react-table"
import MOCK_DATA from './MockAccTable.json'
import { BsThreeDots } from 'react-icons/bs'
import "../static/components.css"
import { Row } from "react-bootstrap"

export default function CompUTable({Column, Data, dropDown}) {
    const columns = useMemo(()=> Column, [])
    const data = useMemo(()=> Data, [])
    const dropdownList = useMemo(()=>dropDown, [])
    const [arrowClicked, setArrowClicked] = useState()

    

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
    
    return (
    <div className="account">
        <table className="account-table"{...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup)=>(
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((c)=>(
                                <th {...c.getHeaderProps()}>{c.render('Header')} </th>
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
                                <td> 
                                    <div style={{cursor:'pointer', display:'flex', justifyContent:'center'}} onClick={()=>{arrowClicked== row.id? setArrowClicked(null): setArrowClicked(row.id)}}>
                                        <BsThreeDots/>
                                    </div>

                                    <div className='dropdown-arrow' style={{display: arrowClicked== row.id ? 'block': 'none'}}>
                                       { dropdownList && dropdownList.map((e)=>{
                                           if (e.val == "Delete")
                                           {return (
                                            <div className='dropdown-list' onClick={()=>{e.function(row.original._id); setArrowClicked(null)}}>
                                             {e.val}
                                            </div> 
                                           )} else {
                                            return (
                                                <div className='dropdown-list' onClick={e.function}>
                                                 {e.val}
                                                </div> 
                                               )
                                           }
                                           
                                       }) }
                                       
                                    </div> 
                                 </td>
                            </tr>
                        )
                })}
            </tbody>
        </table>
    </div>
    )
}