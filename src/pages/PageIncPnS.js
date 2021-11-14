
import React, {useState, useEffect} from "react"
import PageUTemplate from "./PageUTemplate"
import CompSearch from "../components/CompUSearch"
import CompUTable from "../components/CompUTable"
import placeholder from "../../assets/images/image_placeholder.jpg"
import CompUMainButton from "../components/CompUMainButton"
import CompAddProduct from "../components/CompAddProduct"
import "../static/pages.css"
import Modal from 'react-modal';
import { useLocation, useHistory} from "react-router-dom";
const { ipcRenderer } = window.require('electron');

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
        Header : ' ',
        accessor : 'image',
        Cell: props => { 
        var val = props.cell.value
        return (
        <img style={{objectFit:'cover', width:'40px', height:'40px'}} src={val? val : placeholder} alt="placeholder"/>
        )}},
    {
        Header : 'Name',
        accessor : 'name'
    },
    {
        Header : 'Type',
        accessor : 'type'
    },
    {
        Header : 'SKU',
        accessor : 'sku'
    },
    {
        Header : 'Description',
        accessor : 'description'
    },
    {
        Header : 'Quantity',
        accessor : 'qty'
    },
    {
        Header : 'Cost',
        accessor : 'cost',
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

export default function PageIncPnS()
{
    //initialization
    const [Data, setData] = useState();
    const [modalIsOpen, setIsOpen] = useState(false);
    const location = useLocation();
    let history = useHistory()

    useEffect(() => {
        location.state && setIsOpen(true)

        ipcRenderer.send('read_inventory', 'read' )
        ipcRenderer.on('read_inventory_reply', (event, arg) => {
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
        history.push('/income')
        history.push('/income/pns')
    }

    const deleteRow = (id)=>{
        ipcRenderer.send('remove_inventory', id )
        ipcRenderer.on('remove_inventory_reply', (event, arg) => {
            console.log('removed successfully')
            updateData()
          })
        console.log(id)
    }

    const dropdownLists = [
        {val:'View/Edit', function : ()=>alert('edit')},
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
            <CompUMainButton onClick={openModal} label="+ Add"/>
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
                    contentLabel="Add Customer"
                    ariaHideApp={false}
                >
                    <CompAddProduct updateData={updateData} closeModal={setIsOpen} />
                </Modal>
                {Data && <CompUTable Column={COLUMNS} Data={Data} dropDown={dropdownLists}/>}
                </div>
            </>
        } />
    )
}
