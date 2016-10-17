const ipc = require('electron').ipcMain
const storage = require('electron-json-storage')

ipc.on('DeleteByQrcode-message', function (event, arg) {
  let output = new Object()
  let target = `${arg}`
  storage.get('data', function (err, obj) {
    if (err) {
      throw err
    }
    for (let oid in obj) {
      output[oid] = [].concat(obj[oid])
    }
    let str = '未找到二维码中的OID标识编号 '+target
    if (output.hasOwnProperty(target)) {
      str = target+','+output[target].toString()
      delete output[target]
    }
    storage.set('data', output, function (err) {
      if (err) {
        throw err
      }
      event.sender.send('DeleteByQrcode-reply', str)
    })
  })
})

ipc.on('DeleteByQrcodeShow-message', function (event, arg) {
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
      event.sender.send('DeleteByQrcodeShow-reply', str)
    })
  })
})
