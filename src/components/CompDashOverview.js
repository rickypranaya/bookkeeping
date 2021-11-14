
import React, { useState } from "react"

import "../static/components.css"
import { Doughnut, Bar, Pie, Line , horizontalBar} from 'react-chartjs-2';



const state = {
labels: ['income', 'Expense'],
datasets: [
{
    label: 'acc',
    backgroundColor: [
    'lightgrey',
    '#2d71fb'
    
    ],
    hoverBackgroundColor: [
    '#501800',
    '#4B5000'
    
    ],
    data: [65, 59]
}
]
}

const state2 = {
labels: ['$100.00 Cost of Sales', '$20.00 Expense'],
datasets: [
{
    label: 'acc',
    backgroundColor: [
    'lightgrey',
    '#01c4ac'
    
    ],
    hoverBackgroundColor: [
    '#501800',
    '#4B5000'
    
    ],
    data: [20, 80]
}
]
}
            


const stateLine = {
labels: ['Overdue', 'Deposited'],
datasets: [
    {
    label: 'invoice',
    fill: false,
    lineTension: 0.5,
    backgroundColor: '#2d71fb',
    borderColor: 'rgba(0,0,0,1)',
    borderWidth: 2,
    data: [65, 59]
}
]
}

export default function CompDashOverview()
{

    // --------------------
    // Render
    // --------------------
    return (
        <div className="dash-overview">
            {/* TItle */}
            <div className="text-title">Business Overview</div>

            {/* OVERVIEWS */}
            <div className="dash-overview-holder">

                {/* PROFIT AND LOSS */}
                <div className="dash-overview-card">
                    <span className="dash-overview-card-text2">
                        PROFIT AND LOSS
                    </span>
                    
                    <Doughnut
                    data={state}
                    options={{
                        title:{
                        display:true,
                        text:'Expense'
                        },
                        legend:{
                        display:false,
                        position:'right'
                        }
                    }}
                    />
                    
                </div>

                {/* INVOICES */}
                <div className="dash-overview-card">
                    <span className="dash-overview-card-text2">
                        INVOICES
                    </span>
                    
                    <Bar
                    data={stateLine}
                    options={{
                        title:{
                        display:true,
                        text:'Expense'
                        },
                        legend:{
                        display:false,
                        position:'right'
                        }
                    }}
                    />
                    
                </div>

                {/* Expenses */}
                <div className="dash-overview-card">
                    <span className="dash-overview-card-text2">
                        EXPENSES
                    </span>
                    
                    <Doughnut
                    data={state2}
                    options={{
                        title:{
                        display:true,
                        text:'Expense'
                        },
                        legend:{
                        display:false,
                        position:'right'
                        }
                    }}
                    />
                    
                </div>

                {/* SALES */}
                <div className="dash-overview-card">
                    <span className="dash-overview-card-text2">
                        SALES
                    </span>
                    
                    <Pie
                    data={state}
                    options={{
                        title:{
                        display:true,
                        text:'Expense'
                        },
                        legend:{
                        display:false,
                        position:'right'
                        }
                    }}
                    />
                    
                </div>
            </div>
           
        </div>
    )
}
