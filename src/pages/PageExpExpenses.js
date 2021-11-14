
import React, {useState, useEffect} from "react"
import PageUTemplate from "./PageUTemplate"
import CompSearch from "../components/CompUSearch"
import CompUSecondaryButton from "../components/CompUSecondaryButton"
import CompExpNewTransaction from "../components/CompExpNewTransaction"
import CompUSelect from "../components/CompUSelect"
import CompUTable from "../components/CompUTable"
import MOCK_DATA from"../components/MockExpTable.json"
import CompUMainButton from "../components/CompUMainButton"
import CompMakePayment from "../components/CompMakePayment"
// import CompExpExpTable from "../components/CompExpExpTable"
import Modal from 'react-modal';
import { useLocation} from "react-router-dom";

import "../static/pages.css"

const COLUMNS =[
    {
        Header : 'Date',
        accessor : 'date'
    },
    {
        Header : 'Type',
        accessor : 'type'
    },
    {
        Header : 'Payee',
        accessor : 'payee'
    },
    {
        Header : 'Total',
        accessor : 'total'
    },
    {
        Header : 'Open Balance',
        accessor : 'open_balance'
    },
    {
        Header : 'Status',
        accessor : 'status'
    }
]

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
      padding:0,
      border:'0px solid green'
    },
    overlay: {
        zIndex: 1000,
        backgroundColor:'rgb(0,0,0,0.5)'
    }
  };



export default function PageExpExpenses()
{

    const [modalIsOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        location.state && setIsOpen(true)
    },[]);

    function openModal(value) {
        setIsOpen(true);
    }

    function afterOpenModal() {
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <PageUTemplate
        tl={
            <>
                <CompSearch />
                <div className="main-select"> <CompUSelect label='Status' /> </div>
                <div className="main-select"> <CompUSelect label ='Date' /> </div>
            </>
        } 
        tr={
            <>
                <CompUSecondaryButton label="Make Payment" />
                <CompUMainButton onClick={openModal} label="+ New Transaction"/>
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
                    contentLabel="New Transaction"
                    ariaHideApp={false}
                >
                    <CompMakePayment/>
                </Modal>

                <CompUTable Column={COLUMNS} Data={MOCK_DATA} dropDown={['View/Edit', 'Print', 'Delete']}/>
            </div>
            </>
        } />
    )
}
