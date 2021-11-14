
import React, {useState, useEffect} from "react"
import "../index.css"
import CompUSelect from "./CompUSelect"
import CompUTextField from "./CompUTextField"
import CompUMainButton from "./CompUMainButton"
import { propTypes } from "react-bootstrap/esm/Image"
// const {remote} = window.require('electron');
const { ipcRenderer } = window.require('electron');

// const dbInstance = remote.getGlobal('db');

export default function CompAddAccount(props) {

    // Data for account options
    const accountTypeOptions = [
        { value: 'cash', label: 'Cash and Cash equivalents' },
        { value: 'current_assets', label: 'Current assets' },
        { value: 'trade_and_other_receivables', label: 'Trade and other receivables' },
        { value: 'ppe', label: 'Property, plant and equipment' },
        { value: 'non_current_assets', label: 'Non-current assets' },
        { value: 'trade_and_other_payables', label: 'Trade and other payables' },
        { value: 'credit_card', label: 'Credit Card' },
        { value: 'current_liabilities', label: 'Current liabilities' },
        { value: 'non_current_liabilities', label: 'Non-current liabilities' },
        { value: 'equity', label: 'Equity' },
        { value: 'revenue', label: 'Revenue' },
        { value: 'other_revenue', label: 'Other Revenue' },
        { value: 'cost_of_sales', label: 'Cost of sales' },
        { value: 'expenses', label: 'Expenses' },
        { value: 'other_expense', label: 'Other Expense' }
      ]

    const detailTypeOptions =
        {
            cash: [
                { value: 'CASH_cash_on_hand', label: 'Cash on hand' },
                { value: 'CASH_client_trust_account', label: 'Client trust account' },
                { value: 'CASH_current', label: 'Current' },
                { value: 'CASH_money_market', label: 'Money Market' },
                { value: 'CASH_rents_held', label: 'Rents Held in Trust' },
                { value: 'CASH_savings', label: 'Savings' },
            ],
            current_assets: [
                { value: 'CA_allowance', label: 'Allowance for bad debts' },
                { value: 'CA_development_costs', label: 'Development Costs' },
                { value: 'CA_employee_cash', label: 'Employee Cash Advances' },
                { value: 'CA_inventory', label: 'Inventory' },
                { value: 'CA_investments', label: 'Investments - Other' },
                { value: 'CA_loans_officers', label: 'Loans To Officers' },
                { value: 'CA_loans_others', label: 'Loans To Others' },
                { value: 'CA_loans_shareholders', label: 'Loans to Shareholders' },
                { value: 'CA_other', label: 'Other current assets' },
                { value: 'CA_prepaid_expenses', label: 'Prepaid Expenses' },
                { value: 'CA_retainage', label: 'Retainage' },
                { value: 'CA_undeposited_funds', label: 'Undeposited Funds' },
            ],
            trade_and_other_receivables: [
                { value: 'RECEIVABLE', label: 'Trade and other receivables' },
            ],
            ppe: [
                { value: 'PPE_amortisation', label: 'Accumulated Amortisation' },
                { value: 'PPE_depreciation', label: 'Accumulated Depreciation' },
                { value: 'PPE_depletion', label: 'Accumulated Depletion' },
                { value: 'PPE_buildings', label: 'Buildings' },
                { value: 'PPE_depletable-assets', label: 'Depletable Assets' },
                { value: 'PPE_furniture', label: 'Furniture and Fixtures' },
                { value: 'PPE_leasehold', label: 'Leasehold and Improvements' },
                { value: 'PPE_machinery', label: 'Machinery and equipment' },
                { value: 'PPE_vehicles', label: 'Vehicles' },
                { value: 'PPE_other', label: 'Other Property, Plant, and Equipment' },
            ],
            non_current_assets: [
                { value: 'NCA_intangible', label: 'Intangible Assets' },
                { value: 'NCA_amortisation', label: 'Accumulated amortisation of non-current assets' },
                { value: 'NCA_for_sale', label: 'Available-for-sale financial assets' },
                { value: 'NCA_tax', label: 'Deferred tax' },
                { value: 'NCA_goodwill', label: 'Goodwill' },
                { value: 'NCA_investments', label: 'Investments' },
                { value: 'NCA_lease_buyout', label: 'Lease Buyout' },
                { value: 'NCA_licenses', label: 'Licenses' },
                { value: 'NCA_organizational_costs', label: 'Organizational Costs' },
                { value: 'NCA_other_intangible', label: 'Other intangible assets' },
                { value: 'NCA_other_nca', label: 'Other non-current assets' },
                { value: 'NCA_prepayments', label: 'Prepayments and accrued income' },
                { value: 'NCA_security_deposit', label: 'Security Deposits' },
            ],
            trade_and_other_payables: [
                { value: 'PAYABLES', label: 'Trade and other payables' },
            ],
            credit_card: [
                { value: 'CC', label: 'Credit Card' },
            ],
            current_liabilities: [
                { value: 'CL_client_trust', label: 'Client Trust Accounts - Liabilities' },
                { value: 'CL_current_l', label: 'Current Liabilities' },
                { value: 'CL_tax_l', label: 'Current Tax Liability' },
                { value: 'CL_employee_benefits', label: 'Current Portion of employee benefits obligations' },
                { value: 'CL_finance_leases', label: 'Current portion of obligations under finance leases' },
                { value: 'CL_insurance', label: 'Insurance Payable' },
                { value: 'CL_interest', label: 'Interest payables' },
                { value: 'CL_line_of_credit', label: 'Line of Credit' },
                { value: 'CL_loan', label: 'Loan Payable' },
                { value: 'CL_payroll_clearing', label: 'Payroll Clearing' },
                { value: 'CL_payroll_liabilities', label: 'Payroll liabilities' },
                { value: 'CL_prepaid_expense', label: 'Prepaid Expenses Payable' },
                { value: 'CL_warranty', label: 'Provision for warranty obligations' },
                { value: 'CL_rents_trust', label: 'Rents in trust - Liability' },
                { value: 'CL_borrowings', label: 'Short term borrowings from related parties' },
            ],
            non_current_liabilities: [
                { value: 'NCL_accrual', label: 'Accruals and Defferred Income' },
                { value: 'NCL_loans', label: 'Bank Loans' },
                { value: 'NCL_borrowings', label: 'Long term borrowings' },
                { value: 'NCL_employee_benefit', label: 'Long term employee benefit obligations' },
                { value: 'NCL_notes', label: 'Notes Payable' },
                { value: 'NCL_finance_leases', label: 'Obligations under finance leases' },
                { value: 'NCL_other', label: 'Other non-current liabilities' },
                { value: 'NCL_shareholder', label: 'Shareholder Notes Payable' }
            ],
            equity: [
                { value: 'EQUITY_adjustment', label: 'Accumulated adjustment' },
                { value: 'EQUITY_opening_balance', label: 'Opening Balance Equity' },
                { value: 'EQUITY_ordinary_shares', label: 'Ordinary shares' },
                { value: 'EQUITY_owner', label: "Owner's Equity" },
                { value: 'EQUITY_surplus', label: 'Paid-in capital or surplus' },
                { value: 'EQUITY_contribution', label: 'Partner Contributions' },
                { value: 'EQUITY_distribution', label: 'Partner Distributions' },
                { value: 'EQUITY_partner', label: "Partner's Equity" },
                { value: 'EQUITY_preferred_shares', label: 'Preferred shares' },
                { value: 'EQUITY_retained_earnings', label: 'Retained Earnings' },
                { value: 'EQUITY_share_capital', label: 'Share capital' },
                { value: 'EQUITY_treasury', label: 'Treasury Shares' },
            ],
            revenue: [
                { value: 'REV_discount', label: 'Discounts/Refunds Given' },
                { value: 'REV_non_profit', label: 'Non-Profit Revenue' },
                { value: 'REV_other', label: 'Other Primary Revenue' },
                { value: 'REV_sales', label: 'Sales of Product Revenue' },
                { value: 'REV_service', label: 'Service/Fee Revenue' },
                { value: 'REV_unappplied', label: 'Unapplied Cash Payment Income' },
            ],
            other_revenue: [
                { value: 'OREV_dividend', label: 'Dividend Revenue' },
                { value: 'OREV_fixed', label: 'Gain/loss on sale of fixed assets' },
                { value: 'OREV_investments', label: 'Gain/loss on sale of investments' },
                { value: 'OREV_interest', label: 'interest eaerned' },
                { value: 'OREV_other_investment', label: 'Other Investment Revenue' },
                { value: 'OREV_miscellaneous', label: 'Other Miscellaneous Revenue' },
                { value: 'OREV_tax_exempt', label: 'Tax-Exempt Interest' }
            ],
            cost_of_sales: [
                { value: 'COS_cos', label: 'Cost of Sales' },
                { value: 'COS_labour', label: 'Cost of Labour' },
                { value: 'COS_equipment', label: 'Equipment rental' },
                { value: 'COS_other', label: 'Other costs of sales' },
                { value: 'COS_shipping', label: 'Shipping, Freight and Delivery' },
                { value: 'COS_supplies', label: 'Supplies and materials' },
            ],
            expenses: [
                { value: 'EXP_Admin', label: 'Administrative Expenses' },
                { value: 'EXP_Advertising', label: 'Advertising/Promotional' },
                { value: 'EXP_auto', label: 'Auto' },
                { value: 'EXP_bad_debt', label: 'Bad debts' },
                { value: 'EXP_bank_charges', label: 'Bank charges' },
                { value: 'EXP_Charitable', label: 'Charitable Contributions' },
                { value: 'EXP_Labour', label: 'Cost of Labour' },
                { value: 'EXP_Distribution', label: 'Distribution costs' },
                { value: 'EXP_Subscriptions', label: 'Dues and Subscriptions' },
                { value: 'EXP_Entertainment', label: 'Entertainment' },
                { value: 'EXP_Equipment', label: 'Equipment rental' },
                { value: 'EXP_Finance', label: 'Finance costs' },
                { value: 'EXP_Insurance', label: 'Insurance' },
                { value: 'EXP_Interest', label: 'Interest paid' },
                { value: 'EXP_Legal', label: 'Legal and professional fees' },
                { value: 'EXP_Meals', label: 'Meals and entertainment' },
                { value: 'EXP_Miscellaneous', label: 'Other Miscellaneous Service Cost' },
                { value: 'EXP_Payroll', label: 'Payroll Expenses' },
                { value: 'EXP_Promotional', label: 'Promotional Meals' },
                { value: 'EXP_Rent', label: 'Rent or Lease of Buildings' },
                { value: 'EXP_Repair', label: 'Repair and maintenance' },
                { value: 'EXP_Shipping', label: 'Shipping, Freight, and Delivery' },
                { value: 'EXP_Supplies', label: 'Supplies' },
                { value: 'EXP_Taxes', label: 'Taxes Paid' },
                { value: 'EXP_Travel', label: 'Travel' },
                { value: 'EXP_Travel_meals', label: 'Travel meals' },
                { value: 'EXP_Unapplied', label: 'Unapplied Cash Bill Payment Expense' },
                { value: 'EXP_Utilities', label: 'Utilities' },
            ],
            other_expense: [
                { value: 'OEXP_amortisation', label: 'Amortisation' },
                { value: 'OEXP_depreciation', label: 'Depreciation' },
                { value: 'OEXP_exchange', label: 'Exchange Gain or Loss' },
                { value: 'OEXP_other', label: 'Other Expense' },
                { value: 'OEXP_penalties', label: 'Penalties and settlements' },
            ],
        }

       //account Type
       const [accountTypeFull, setAccountTypeFull] = useState(accountTypeOptions[0]);
       const [accountType, setAccountType] = useState(accountTypeFull.value);

       //detail Type
       const [detailTypeFull, setDetailTypeFull] = useState(detailTypeOptions[accountType][0]);

       //Name, description, balance, asOf
        const [name, setName]= useState(detailTypeFull.label)
        const [description, setDescription]= useState('')
        const [balance, setBalance]= useState('0.00')
        const [asOf, setAsOf]= useState()

        useEffect(() => {
            setAsOf(getToday())
        },[]);
    
        const getToday = ()=>{
            let now = new Date()
            return (now.getDate() +'/'+ (now.getMonth()+1)+"/"+ now.getFullYear())
        }

       const handleChangeType = (val)=>{
           setAccountTypeFull(val)
           setAccountType(val.value)
           setDetailTypeFull(detailTypeOptions[val.value][0])
           setName(detailTypeOptions[val.value][0].label)
       }

       const handleChangeDetail = (val)=>{
            setDetailTypeFull(val)
            // setDetailType(val.value)
            setName(val.label)
        }
        
        //handling balance input
        const [balanceTemp, setBalanceTemp]= useState('0.00')
        const _handlingInput=(number) =>{
           let num = number.replace(/[^.0-9]/g, '')
           if (num.startsWith('.')) {
            setBalanceTemp('')
           } else {
                if ((num.split(".").length - 1) <= 1){
                    setBalanceTemp(num)
                    let bal = parseFloat(Number(num)).toFixed(2)
                    setBalance(bal)
                }
           } 
          }

        //handling date
        const [dateFalse, setDateFalse]= useState(false)
        const _handlingDate = (text) =>{
            let mod= text.replace(/[^/0-9]/g, '')
            if ( mod.length > 10) {
                return;
            }

            if ( mod.length === 10){
                if (mod.match(/[0-3][0-9]\/(0[1-9]|1[0-2])\/20[0-2][0-9]/g)){
                    setAsOf(mod)
                    setDateFalse(false)
                } else {
                    setAsOf('')
                    setDateFalse(true)
                }
            }
            setAsOf(mod)
        }


        // When click save
        const handleSave = ()=>{
            let body ={
                type : JSON.stringify(accountTypeFull),
                detail : JSON.stringify(detailTypeFull),
                name : name,
                description : description,
                balance : balance,
                as_of : asOf
            }

            ipcRenderer.send('insert_account', body )
            ipcRenderer.on('insert_account_reply', (event, arg) => {
                console.log(arg)
                props.closeModal(false)
                props.updateData()
              })
        }       

    return (
    <div className="addAccount">
        <div className="title">New Account</div>
        <CompUSelect label="Account Type" defaultValue={accountTypeFull} options={accountTypeOptions} onChange={handleChangeType}/>
        <CompUSelect label="Detail Type"  defaultValue={detailTypeFull} options={detailTypeOptions[accountType]} onChange={handleChangeDetail}/>
        <CompUTextField label="Name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
        <CompUTextField label="Description" placeholder="optional" onChange={(e)=>{setDescription(e.target.value)}}/>

        <div style={{display:'flex', flexDirection:'row'}}>
            <CompUTextField 
                alignRight={true} 
                value={balanceTemp} 
                label="Balance" 
                onChange={(e)=>{_handlingInput(e.target.value)}} 
                onFocus={()=>{setBalanceTemp('')}} 
                onBlur={()=>{ 
                    if (balance.length>6 ){
                        if(balance.length >9){
                            setBalanceTemp('$'+balance.slice(0,-9)+','+balance.slice(-9,-6)+','+balance.slice(-6))
                        }else {
                            setBalanceTemp('$'+balance.slice(0,-6)+','+balance.slice(-6))
                        }
                    } else {
                        setBalanceTemp('$'+balance)
                    } 
                }
                }
            />
            <CompUTextField 
                value={asOf} 
                label="as of" 
                placeholder="15/04/2000" 
                error={dateFalse}
                onChange={(e)=>{_handlingDate(e.target.value)}}
                onFocus={()=>{setAsOf('')}} />          
        </div>
        
        <div className="addAccount-button">   
            <CompUMainButton label="Save" onClick={()=>{handleSave()}}/>
        </div>
    </div>
    )
}