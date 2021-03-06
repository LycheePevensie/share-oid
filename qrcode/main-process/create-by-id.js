const ipc = require('electron').ipcMain
const fs = require('fs')
const path = require('path')
const storage = require('electron-json-storage')

ipc.on('CreateById-message', function (event, arg) {
  let output = new Object()
  let arr = `${arg}`.split(';')
  let target = arr.shift()
  storage.get('data', function (err, obj) {
    if (err) {
      throw err
    }
    for (let oid in obj) {
      output[oid] = [].concat(obj[oid])
    }
    let str = '输入的OID标识编号 '+target+' 已存在'
    if (!output.hasOwnProperty(target)) {
      output[target] = [].concat(arr)
      str = target+','+output[target].toString()
    }
    storage.set('data', output, function (err) {
      if (err) {
        throw err
      }
      event.sender.send('CreateById-reply', str)
    })
  })
})

const os = require('os')
const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const shell = electron.shell

ipc.on('CreateById-pdf', function (event) {
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

ipc.on('CreateByIdShow-message', function (event, arg) {
  let output = new Object()
  storage.get('data', function (err, obj) {
    if (err) {
      throw err
    }
    let str = ''
    for (let oid in obj) {
      output[oid] = [].concat(obj[oid])
      str = str+oid+','+output[oid].toString()+'<br>'
    }
    storage.set('data', output, function (err) {
      if (err) {
        throw err
      }
      event.sender.send('CreateByIdShow-reply', str)
    })
  })
})
