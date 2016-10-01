const ipc = require('electron').ipcMain
const fs = require('fs')
const path = require('path')

ipc.on('RetrieveById-message', function (event, arg) {
  let output = new Object()
  let target = `${arg}`
  let str = ''
  fs.readFile(path.join(__dirname, 'data.json'), function (err, input) {
    if (err) {
      throw err
    }
    let obj = JSON.parse(input)
    for (let oid in obj) {
      output[oid] = [].concat(obj[oid])
    }
    str = 'Not Found!'
    if (output.hasOwnProperty(target)) {
      str = output[target].toString()
    }
    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(output), function (err) {
      if (err) {
        throw err
      }
    });
  });
  event.sender.send('RetrieveById-reply', str)
})
