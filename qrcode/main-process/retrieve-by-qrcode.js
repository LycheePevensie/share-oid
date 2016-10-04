const ipc = require('electron').ipcMain
const fs = require('fs')
const path = require('path')

ipc.on('RetrieveByQrcode-message', function (event, arg) {
  let output = new Object()
  let target = `${arg}`
  fs.readFile(path.join(__dirname, '../data.json'), function (err, input) {
    if (err) {
      throw err
    }
    let obj = JSON.parse(input)
    for (let oid in obj) {
      output[oid] = [].concat(obj[oid])
    }
    let str = target+','+'Not Found!'
    if (output.hasOwnProperty(target)) {
      str = target+','+output[target].toString()
    }
    fs.writeFile(path.join(__dirname, '../data.json'), JSON.stringify(output), function (err) {
      if (err) {
        throw err
      }
      event.sender.send('RetrieveByQrcode-reply', str)
    })
  })
})

ipc.on('RetrieveByQrcodeShow-message', function (event, arg) {
  let output = new Object()
  fs.readFile(path.join(__dirname, '../data.json'), function (err, input) {
    if (err) {
      throw err
    }
    let str = ''
    let obj = JSON.parse(input)
    for (let oid in obj) {
      output[oid] = [].concat(obj[oid])
      str = str+oid+','+output[oid].toString()+'<br>'
    }
    fs.writeFile(path.join(__dirname, '../data.json'), JSON.stringify(output), function (err) {
      if (err) {
        throw err
      }
      event.sender.send('RetrieveByQrcodeShow-reply', str)
    })
  })
})
