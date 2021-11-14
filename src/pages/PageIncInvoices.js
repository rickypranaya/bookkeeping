
import React, {useEffect, useState} from "react"
import PageUTemplate from "./PageUTemplate"
import CompSearch from "../components/CompUSearch"
import CompUSecondaryButton from "../components/CompUSecondaryButton"
import CompUMainButton from "../components/CompUMainButton"
import CompUSelect from "../components/CompUSelect"
import CompUTable from "../components/CompUTable"
import MOCK_DATA from '../components/MockInvoiceTable.json'
import CompIncInvoice from "../components/CompIncInvoice"
import CompReceivePayment from "../components/CompReceivePayment"
// import ProgressBar from 'react-bootstrap/ProgressBar'
import { Progress } from 'reactstrap';
import Modal from 'react-modal';
import "../static/pages.css"
import { useLocation} from "react-router-dom";
import { RiArrowDownSLine } from "react-icons/ri"


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      padding:0,
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
        Header : 'Date',
        accessor : 'date'
    },
    {
        Header : 'Invoice No.',
        accessor : 'invoice'
    },
    {
        Header : 'Customer',
        accessor : 'customer'
    },
    {
        Header : 'Amount',
        accessor : 'amount'
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


export default function PageIncInvoices(props)
{
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalReceive, setModalReceive] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.state){
            let link = location.state
            if (link == 'invoice'){
                setIsOpen(true)
            } else {
                setModalReceive(true)
            }
        } 
    },[]);

    function openModal(value) {
        setIsOpen(true);
    }

    function afterOpenModal() {
    }

    function closeModal() {
        setIsOpen(false);
    }

    function openModalReceive(value) {
        setModalReceive(true);
    }

    function afterOpenModalReceive() {
    }

    function closeModalReceive() {
        setModalReceive(false);
    }

    return (
        <PageUTemplate
        head={ 
            <>
            <Progress color="success" value="25" />
            </>
        }
        tl={
            <>
                 
                <CompSearch />
                <div className="main-select"> <CompUSelect label='Status' /> </div>
                <div className="main-select"> <CompUSelect label ='Date' /> </div>
            </>
        } 
        tr={
            <>
                <CompUSecondaryButton label="Receive Payment" onClick={openModalReceive}/>
                <CompUMainButton label='+ Create Invoice' onClick={openModal} />
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
                    contentLabel="create invoice"
                    ariaHideApp={false}
                >
                    <CompIncInvoice/>
                </Modal>

                <Modal
                    isOpen={modalReceive}
                    onAfterOpen={afterOpenModalReceive}
                    onRequestClose={closeModalReceive}
                    style={customStyles}
                    contentLabel="Receive Payment"
                    ariaHideApp={false}
                >
                    <CompReceivePayment/>
                </Modal>   
                <CompUTable Column={COLUMNS} Data={MOCK_DATA} dropDown={['View/Edit', 'Print', 'Delete']}/>
            </div>
            </>
        } />
    )
}
