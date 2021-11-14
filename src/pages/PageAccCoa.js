
import React, {useState, useEffect} from "react"
import PageUTemplate from "./PageUTemplate"
import CompUTable from "../components/CompUTable"
// import MOCK_DATA from '../components/MockAccTable.json'
import CompSearch from "../components/CompUSearch"
import CompUMainButton from "../components/CompUMainButton"
import Modal from 'react-modal';
import CompAddAccount from "../components/CompAddAccount"
const { ipcRenderer } = window.require('electron');
import { useHistory, useLocation } from "react-router-dom"

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
        Header : 'Name',
        accessor : 'name'
    },
    {
        Header : 'Type',
        accessor : 'type',
        Cell: (props) => {
            let obj = JSON.parse(props.cell.value)
            return (
                <span>{obj.label}</span>
            );
        }
    },
    {
        Header : 'Detail',
        accessor : 'detail',
        Cell: (props) => {
            let obj = JSON.parse(props.cell.value)
            return (
                <span>{obj.label}</span>
            );
        }
    },
    {
        Header : 'Description',
        accessor : 'description'
    },
    {
        Header : 'Balance',
        accessor : 'balance',
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

export default function PageAccCoa()
{
    //initialization
    const [Data, setData] = useState();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [searchTyped, setSearchedTyped] = useState('');
    let history = useHistory()
    const location = useLocation()

    useEffect(() => {
        location.state && setIsOpen(true)

        ipcRenderer.send('read_account', 'read' )
        ipcRenderer.on('read_account_reply', (event, arg) => {
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
        history.push('/account')
        history.push('/account/coa')
    }

    const deleteRow = (id)=>{
        ipcRenderer.send('remove_account', id )
        ipcRenderer.on('remove_account_reply', (event, arg) => {
            console.log('removed successfully')
            history.push('/account')
            history.push('/account/coa')
          })
        console.log(id)
    }

    const dropdownLists = [
        {val:'Account Report', function : ()=>alert('acc')},
        {val:'Edit', function : ()=>alert('edit')},
        {val:'Delete', function : deleteRow},
    ]

    return (
        <PageUTemplate tl={
            <>
                <CompSearch onChange={(e)=>{setSearchedTyped(e.target.value)}} />
            </>
        } 
        tr={
            <>
            <CompUMainButton label ="+  New" onClick={openModal}/>
            </>
        }
        body={
            <>
            <div className="Page-body"> 

                {Data && <CompUTable Column={COLUMNS} Data={Data} dropDown={dropdownLists}/>}
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Add account"
                    ariaHideApp={false}
                >
                    <CompAddAccount updateData={updateData} closeModal={setIsOpen}/>
                </Modal>

            </div>
            </>
        } />
    )
}