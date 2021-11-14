
import { jsPDF } from "jspdf"

// --------------------
// Config
// --------------------
const doc = new jsPDF();
const padding = 20;
const minX = padding;
const minY = padding;
const maxX = doc.internal.pageSize.getWidth()-padding;
const maxY = doc.internal.pageSize.getHeight()-padding;
const midX = doc.internal.pageSize.getWidth()/2;
const midY = doc.internal.pageSize.getHeight()/2;

// Font sizes
const fontSize1 = "28";
const fontSize2 = "14";
const fontSize3 = "10";


// --------------------
// Invoices
// --------------------
function PdfInvoice(props)
{
    console.log(props)

    // --------------------
    // Header
    // --------------------
    // ----- Essential ----- //
    var parentY = minY;
    doc.setFontSize(fontSize1);
    doc.text("Company1 pte.ltd", minX, parentY, { align:"left" });
    doc.text("Invoice", maxX, parentY, { align:"right" });

    doc.setFontSize(fontSize3);
    doc.text("DATE: "+props.invoice_date, maxX-35, parentY+10);
    doc.text("INVOICE: 1003", maxX-35, parentY+16);


    // ----- Small stuffs ----- //
    parentY += 40;
    const titleGap = 24;
    doc.setFont(undefined, "bold");
    doc.setFontSize(fontSize2);
    doc.text("FROM:", minX, parentY);
    doc.text("TO:", midX, parentY);
    doc.text("TERMS:", minX, parentY+30);
    doc.text("DUE:", minX, parentY+38);


    doc.setFont(undefined, "normal");
    doc.setFontSize(fontSize3);
    doc.text("company 1 Pte.Ltd", minX+titleGap, parentY);
    doc.text("abc@gmail.com", minX+titleGap, parentY+5);
    doc.text("12 abc street", minX+titleGap, parentY+10);
    doc.text("327823", minX+titleGap, parentY+15);

    doc.text(props.customer.name, midX+titleGap, parentY);
    doc.text(props.customer.email, midX+titleGap, parentY+5);
    doc.text(props.customer.address, midX+titleGap, parentY+10);
    doc.text(props.customer.b_country, midX+titleGap, parentY+15);

    doc.text(props.term, minX+titleGap, parentY+30);
    doc.text(props.due_date, minX+titleGap, parentY+38);



    // --------------------
    // MIDDLE
    // --------------------
    // ----- Table ----- //
    parentY += 50;
    const header = [
        {name: "0", prompt: "Item", width: 65},
        {name: "1", prompt: "Description", width: 65},
        {name: "2", prompt: "Qty", width: 28, align: "center"},
        {name: "3", prompt: "Price", width: 35},
        {name: "4", prompt: "Amount", width: 35},
    ]

    let data =[]
    props.products.map((e)=>[
        data = [...data, {"0":e.product_service, "1": e.description, "2": e.quantity, "3": "$"+e.rate, "4": "$"+e.amount}]
    ])

    //  data = [
    //     { "0": "Test", "1": "1", "2":"$1", "3":"$1.00" },
    //     { "0": "Test", "1": "1", "2":"$1", "3":"$1.00" },
    //     { "0": "Test", "1": "1", "2":"$1", "3":"$1.00" },
    //     { "0": "Test", "1": "1", "2":"$1", "3":"$1.00" },
    //     { "0": "Test", "1": "1", "2":"$1", "3":"$1.00" }
    // ]
    doc.table((doc.internal.pageSize.getWidth()-165)/2, parentY, data, header);


    // ----- Totals ----- //
    parentY += (data.length+1)*11 + 8;

    doc.setFont(undefined, "bold");
    doc.text("Subtotal: "+props.total, maxX-2, parentY, { align:"right" });
    doc.text("Tax: $0.00", maxX-2, parentY+6, { align:"right" });

    doc.setFontSize(fontSize2);
    doc.text("BALANCE DUE: "+props.due, maxX-2, parentY+15, { align:"right" });


    // --------------------
    // Notes
    // --------------------
    parentY += 30;

    doc.text("Notes:", minX, parentY);

    doc.setFont(undefined, "normal");
    doc.rect(minX, parentY+4, maxX-minX, 40);
    doc.setFontSize(fontSize3);
    doc.text(props.notes, minX+2, parentY+10);

    // Save it
    doc.save("invoice.pdf");
}


export { PdfInvoice }
