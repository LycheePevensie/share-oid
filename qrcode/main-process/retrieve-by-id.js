const ipc = require('electron').ipcMain
const fs = require('fs')
const path = require('path')
const storage = require('electron-json-storage')

ipc.on('RetrieveById-message', function (event, arg) {
  let output = new Object()
  let target = `${arg}`
  storage.get('data', function (err, obj) {
    if (err) {
      throw err
    }
    for (let oid in obj) {
      output[oid] = [].concat(obj[oid])
    }
    let str = '未找到输入的OID标识编号 '+target
    if (output.hasOwnProperty(target)) {
      str = target+','+output[target].toString()
    }
    storage.set('data', output, function (err) {
      if (err) {
        throw err
      }
      event.sender.send('RetrieveById-reply', str)
    })
  })
})

const os = require('os')
const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const shell = electron.shell

ipc.on('RetrieveById-pdf', function (event) {
  let pdfPath = path.join(os.tmpdir(), 'print.pdf')
  let win = BrowserWindow.fromWebContents(event.sender)
  win.webContents.printToPDF({pageSize: 'A3'}, function (error, data) {
    if (error) {
      throw error
    }
    fs.writeFile(pdfPath, data, function (error) {
      if (error) {
        throw error
      }
      shell.openExternal('file://'+pdfPath)
    })
  })
})

ipc.on('RetrieveByIdShow-message', function (event, arg) {
  let output = new Object()
  let target = eval(`${arg}`)
  storage.get('data', function (err, obj) {
    if (err) {
      throw err
    }
    let str = ''
    for (let oid in obj) {
      output[oid] = [].concat(obj[oid])
      if (oid.match(target)) {
        str = str+oid+','+output[oid].toString()+'<br>'
      }
    }
    storage.set('data', output, function (err) {
      if (err) {
        throw err
      }
      event.sender.send('RetrieveByIdShow-reply', str)
    })
  })
})
