const ipc = require('electron').ipcMain
const storage = require('electron-json-storage')

ipc.on('RetrieveByQrcode-message', function (event, arg) {
  let output = new Object()
  let target = `${arg}`
  storage.get('data', function (err, obj) {
    if (err) {
      throw err
    }
    for (let oid in obj) {
      output[oid] = [].concat(obj[oid])
    }
    let str = target+' Not Found!'
    if (output.hasOwnProperty(target)) {
      str = target+','+output[target].toString()
    }
    storage.set('data', output, function (err) {
      if (err) {
        throw err
      }
      event.sender.send('RetrieveByQrcode-reply', str)
    })
  })
})

ipc.on('RetrieveByQrcodeShow-message', function (event, arg) {
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
      event.sender.send('RetrieveByQrcodeShow-reply', str)
    })
  })
})
