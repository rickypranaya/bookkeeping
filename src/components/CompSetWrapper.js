
import React, { useEffect, useState } from "react"
import CompUTextField from "./CompUTextField"
import { FaPen, FaSave } from "react-icons/fa"
import {MdDelete} from "react-icons/md" 
import placeholder from "../../assets/images/image_placeholder.jpg"
import "../static/components.css"

const template = [
    {
        title: "Company details",
        image: "placeholder",
        edit: false,
        fields: [
            ["Company name", "Company pte ltd"],
            ["Legal name", "Same as company name"],
            ["Unique Entity Number (UEN)", "99-1111110"],
            ["Goods and Service Tax ID (GST)", "-"]
        ]
    },
    {
        title: "Company type",
        edit: false,
        fields: [
            ["Tax form", "Partnership or limited liability company"],
            ["Industry", "Administrative and Support Services"]
        ]
    },
    {
        title: "Contact info",
        edit: false,
        fields: [
            ["Company email", "rpranaya.2000@gmail.com"],
            ["Customer-facing email", "Same as company name"],
            ["Company phone", "+65 86493829"],
            ["Website", "-"]
        ]
    },
    {
        title: "Address",
        edit: false,
        fields: [
            ["Company address", "-"],
            ["Customer-facing address", "Same as company name"],
            ["Legal address", "Same as company name"],
        ]
    },
]



export default function CompSetWrapper()
{

    const [content, setContent] = useState(template);
    const [file, setFile] = useState();

    // --------------------
    // Functions
    // --------------------
    // Change edit mode/save mode
    function EditSave(e)
    {
        const id = e.currentTarget.id;
        const _content = [...content];
        _content[id].edit = !_content[id].edit;
        setContent(_content);
    }

    const  handleChange=(event)=> {
    setFile(URL.createObjectURL(event.target.files[0]))
    }

    // --------------------
    // Render
    // --------------------
    return (
        <div>
            { content.map(({ title, edit, fields , image}, index) => {
                return (
                    <div key={index}>
                        {/* Title */}
                        <span className="set-wrapper-title">
                            {title}
                            <button id={index} onClick={EditSave} className="set-wrapper-button">
                                { !edit ? <FaPen size="15" color="#8e959d"/> : <FaSave size="15" color="#8e959d"/> }
                            </button>
                        </span>

                        {image && 
                             <label class="profile-image-label" style={{paddingLeft: edit?'0px': '20px'}} data-toggle="tooltip" data-placement="top" title="Add Image">
                                <img className="profile-image-setting" src={file? file : placeholder} alt="placeholder"/>
                                <input id="get-image" type="file" name="file" onChange={handleChange} accept="image/*" style={{visibility:"hidden"}}/>
                              </label>
                        }

                        {edit && file && image && <div onClick={()=>{setFile(null)}} className="image-remove"><MdDelete size="20" color="grey"/></div>}
                       
                        {/* Content based on edit/not */}
                        <div className="set-wrapper-inside"
                            style={{ gridTemplateColumns: edit ? "1fr 1fr" : "400px 400px" }}>
                            {
                                fields.map((data, index) => {
                                    return (
                                        edit ?
                                        <CompUTextField label={data[0]} value={data[1]} key={index} />
                                        :
                                        <>
                                        <span className="set-wrapper-inputs-label">{data[0]}</span>
                                        <span className="set-wrapper-inputs-value">{data[1]}</span>
                                        </>
                                    )
                                })
                            }
                        </div>
                        <hr className="set-wrapper-hr" />
                    </div>
                )
            })}
        </div>
    )
}




