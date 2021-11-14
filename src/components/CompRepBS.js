import React from "react"
import MOCK_DATA from"../components/MockBalanceSheet.json"

export default function CompRepBS()
{

    function Generate(data)
    {
        // JSX
        var elements = [];
        var index = 0;
        var marginIncrement = 0.5;

        // Traverse through
        var Q = [...data];
        var margins = new Array(Q.length).fill(0); // For indentation
        var leaves = new Array(Q.length).fill(false); // Bold text, total amount
        
        while (Q.length > 0)
        {
            var length = Q.length;

            // Pop 1 by 1
            while (length-- > 0)
            {
                var cur = Q.pop();
                var margin = margins.pop();
                var isLeaf = leaves.pop();

                for (let i = cur.content.length-1;i >= 0;i--) {
                    Q.push(cur.content[i]);
                    margins.push(margin+marginIncrement);
                    leaves.push(i == cur.content.length-1);
                }
                
                // Create current element
                elements.push(
                    <div key={index} className={`rep-bs-entry ${isLeaf && "leaf"}`}>
                        <span style={{ marginLeft: `${margin}rem`}}>{cur.name}</span>
                        {cur.value && <span>{isLeaf && "S$"}{cur.value}</span>}
                    </div>
                );
                index++;
            }
        }

        return elements;
    }


    return (
        <div className="rep-bs">
            {/* Heading */}
            <div className="rep-bs-header">
                <span className="rep-bs-header-title">Account</span>
                <span><b>Balance Sheet</b></span>
                <span><small>As of December 31, 2021</small></span>
            </div>

            {/* Main content */}
            <div className="rep-bs-content">
                { Generate(MOCK_DATA).map((element, index) => {
                    return element
                })}
            </div>

        </div>
    )
}
