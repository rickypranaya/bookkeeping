
import React, { useEffect } from "react"
import { Link, useLocation, useRouteMatch } from "react-router-dom"

import "../static/components.css"



export default function CompUSection({ tabs })
{
    const { url } = useRouteMatch()
    const location = useLocation()


    // Initial highlight button
    useEffect(() => {
        const tabList = document.querySelectorAll(".section a")
        for (const t of tabList) {
            
            // Highlight current
            if (location.pathname.endsWith(t.id))
            {
                t.style.color = "black"
                t.style.backgroundColor="white"
                t.style.boxShadow= "2px -5px 7px #e1e1e1"

                // t.style.borderBottom = "4px solid var(--color-1)"
                t.style.padding = "10px 30px 5px 30px"
            }
            // Reset all tabs
            else
            {
                t.style.boxShadow= "0px 0px 0px #e1e1e1"
                t.style.color = "var(--color-text-3)"
                t.style.backgroundColor="#f1f3f5"
                // t.style.borderBottom = "4px solid #F5F6F7"
                t.style.padding = "10px 5px 2px 5px"
            }
        }
    }, [location]);
    

    
    // --------------------
    // Render
    // --------------------
    return (
        <div className="section">

            {/* Load all sections */}
            {
                tabs.map(({ name, id }) => {
                    return (
                        <Link to={`${url}/${id}`} key={id} id={id} className="section-tab">
                            <span>{name}</span>
                        </Link>
                    )
                })
            }

        </div>
    )
}

