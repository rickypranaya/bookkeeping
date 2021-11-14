
import React, {useState, useEffect} from "react"

import PageUTemplate from "./PageUTemplate"
import CompSearch from "../components/CompUSearch"
import CompUTable from "../components/CompUTable"
import MOCK_DATA from "../components/MockSupplierTable.json"
import CompUMainButton from "../components/CompUMainButton"
import CompAddCustomer from "../components/CompAddCustomer"
import { IoMdArrowDropdown } from 'react-icons/io'
import Modal from 'react-modal';
import { useLocation} from "react-router-dom";
import { useHistory } from "react-router-dom"
const { ipcRenderer } = window.require('electron');

import "../static/pages.css"

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      display:'flex',
      flexDirection:'column',
      fontSize:'15px',
      borderRadius:'10px',
      border:'0px solid green'
    },
    overlay: {
        zIndex: 1000,
        backgroundColor:'rgb(0,0,0,0.5)'
    }
  };

  const COLUMNS =[
    {
        Header : 'Supplier Name',
        accessor : 'name'
    },
    {
        Header : 'Phone',
        accessor : 'phone'
    },
    {
        Header : 'Email',
        accessor : 'email'
    },
    {
        Header : 'Address',
        accessor : 'address'
    },
    {
        Header : 'Open Balance',
        accessor : 'open_balance',
        Cell: (props) => {
            let balance = props.cell.value
            let balanceStr
            if (balance.length>6 ){
                if(balance.length >9){
                    balanceStr = ('$'+balance.slice(0,-9)+','+balance.slice(-9,-6)+','+balance.slice(-6))
                }else {
                    balanceStr = ('$'+balance.slice(0,-6)+','+balance.slice(-6))
                }
            } else {
                balanceStr = ('$'+balance)
            } 

            return (
              <span style={{textAlign:'right'}}>{balanceStr}</span>
            );
        }
    }
]

export default function PageExpSupplier()
{

    //initialization
    const [Data, setData] = useState();
    const [modalIsOpen, setIsOpen] = useState(false);
    const location = useLocation();
    let history = useHistory()

    useEffect(() => {
        location.state && setIsOpen(true)
        ipcRenderer.send('read_supplier', 'read' )
        ipcRenderer.on('read_supplier_reply', (event, arg) => {
            setData(arg)
          })

    },[]);


    function openModal(value) {
        setIsOpen(true);
    }

    function afterOpenModal() {
    }

    function closeModal() {
        setIsOpen(false);
    }

    const updateData= ()=>{
        history.push('/expense')
        history.push('/expense/supplier')
    }


    const deleteRow = (id)=>{
        ipcRenderer.send('remove_supplier', id )
        ipcRenderer.on('remove_supplier_reply', (event, arg) => {
            console.log('removed successfully')
            updateData()
          })
        console.log(id)
    }

    const dropdownLists = [
        {val:'View/Edit', function : ()=>alert('view/edit')},
        {val:'Create Expense', function : ()=>alert('invoice')},
        {val:'Make Payment', function : ()=>alert('receive payment')},
        {val:'Delete', function : deleteRow},
    ]

    return (
        <PageUTemplate
        tl={
            <>
                <CompSearch />
            </>
        } 
        tr={
            <>
            <CompUMainButton onClick={openModal} label={<>Add Supplier&nbsp;<IoMdArrowDropdown/></>}/>
            </>
        }
        body={
            <>          
                <div className="Page-body">
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Add supplier"
                    ariaHideApp={false}
                >
                    <CompAddCustomer updateData={updateData} closeModal={setIsOpen} userType="Supplier"/>
                </Modal>
                {Data && <CompUTable Column={COLUMNS} Data={Data} dropDown={dropdownLists}/>}
                </div>
            </>
        } />
    )
}
