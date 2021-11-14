
import React from "react"
import "../static/pages.css"

// tl -> components in top left
// tr -> components in top right
// main -> main components
export default function PageUTemplate({head, tl, tr, body})
{
    return (
        <>
            <div className="page">
                {head}
                <div className="page-top">
                    
                    <div className="page-top-left">
                        {tl}
                    </div>
                    <div className="page-top-right">
                        {tr}
                    </div>
                </div>

                {body}
            </div>
        </>
    )
}
