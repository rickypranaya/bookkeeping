
const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const {ipcMain} = require('electron')


// --------------------
// Create Window
// --------------------
function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 720,
    minHeight:650,
    minWidth:1100,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      // preload: path.join(__dirname, 'preload.js')
    }
  })

  win.setTitle('')

  // Load the html file
  win.loadFile("index.html")

}


// // For auto reload
// require("electron-reload")(__dirname, {
//   electron: path.join(__dirname, "node_modules", ".bin", "electron")
// })


// Call the create window function
app.whenReady().then(() => {
  createWindow()

  app.on("ready", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})


//================== DATABASE MANAGEMENT SYSTEM =====================

//databases instances
const db_account = require('./db/stores/account');
const db_customer = require('./db/stores/customer');
const db_supplier = require('./db/stores/supplier');
const db_inventory = require('./db/stores/inventory');
const db_invoice = require('./db/stores/invoice');

// -------------------
// ACCOUNT DB
// -------------------

//insert account
ipcMain.on('insert_account', (event, arg) => {
  db_account.create(arg)
    .then(lists => {
      event.reply('insert_account_reply', 200)
    })
})

//fetch account
ipcMain.on('read_account', (event, arg) => {
  db_account.readAll()
    .then(lists => {
      event.reply('read_account_reply', lists)
    })
})

//remove account
ipcMain.on('remove_account', (event, arg) => {
  db_account.remove(arg)
    .then(lists => {
      event.reply('remove_account_reply', 200)
    })
})


// -------------------
// CUSTOMER DB
// -------------------

//insert customer
ipcMain.on('insert_customer', (event, arg) => {
  db_customer.create(arg)
    .then(lists => {
      event.reply('insert_customer_reply', 200)
    })
})

//fetch customer
ipcMain.on('read_customer', (event, arg) => {
  db_customer.readAll()
    .then(lists => {
      event.reply('read_customer_reply', lists)
    })
})

//remove customer
ipcMain.on('remove_customer', (event, arg) => {
  db_customer.remove(arg)
    .then(lists => {
      event.reply('remove_customer_reply', 200)
    })
})


// -------------------
// SUPPPLIER DB
// -------------------

//insert supplier
ipcMain.on('insert_supplier', (event, arg) => {
  db_supplier.create(arg)
    .then(lists => {
      event.reply('insert_supplier_reply', 200)
    })
})

//fetch supplier
ipcMain.on('read_supplier', (event, arg) => {
  db_supplier.readAll()
    .then(lists => {
      event.reply('read_supplier_reply', lists)
    })
})

//remove supplier
ipcMain.on('remove_supplier', (event, arg) => {
  db_supplier.remove(arg)
    .then(lists => {
      event.reply('remove_supplier_reply', 200)
    })
})


// -------------------
// INVENTORY DB
// -------------------

//insert inventory
ipcMain.on('insert_inventory', (event, arg) => {
  db_inventory.create(arg)
    .then(lists => {
      event.reply('insert_inventory_reply', 200)
    })
})

//fetch inventory
ipcMain.on('read_inventory', (event, arg) => {
  db_inventory.readAll()
    .then(lists => {
      event.reply('read_inventory_reply', lists)
    })
})

//remove inventory
ipcMain.on('remove_inventory', (event, arg) => {
  db_inventory.remove(arg)
    .then(lists => {
      event.reply('remove_inventory_reply', 200)
    })
})


// -------------------
// INVOICE DB
// -------------------

//insert invoice
ipcMain.on('insert_invoice', (event, arg) => {
  db_invoice.create(arg)
    .then(lists => {
      event.reply('insert_invoice_reply', 200)
    })
})

//fetch invoice
ipcMain.on('read_invoice', (event, arg) => {
  db_invoice.readAll()
    .then(lists => {
      event.reply('read_invoice_reply', lists)
    })
})

//remove invoice
ipcMain.on('remove_invoice', (event, arg) => {
  db_invoice.remove(arg)
    .then(lists => {
      event.reply('remove_invoice_reply', 200)
    })
})

