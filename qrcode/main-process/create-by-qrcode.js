const ipc = require('electron').ipcMain
const fs = require('fs')
const path = require('path')

ipc.on('CreateByQrcode-message', function (event, arg) {
  let output = new Object()
  let arr = `${arg}`.split(',')
  let target = arr.shift()
  fs.readFile(path.join(__dirname, '../data.json'), function (err, input) {
    if (err) {
      throw err
    }
    let obj = JSON.parse(input)
    for (let oid in obj) {
      output[oid] = [].concat(obj[oid])
    }
    let str = target+','+'Already Have!'
    if (!output.hasOwnProperty(target)) {
      output[target] = [].concat(arr)
      str = target+','+output[target].toString()
    }
    fs.writeFile(path.join(__dirname, '../data.json'), JSON.stringify(output), function (err) {
      if (err) {
        throw err
      }
      event.sender.send('CreateByQrcode-reply', str)
    })
  })
})