const ipc = require('electron').ipcMain
const storage = require('electron-json-storage')

ipc.on('UpdateByQrcode-message', function (event, arg) {
  let output = new Object()
  let arr = `${arg}`.split(',')
  let target = arr.shift()
  storage.get('data', function (err, obj) {
    if (err) {
      throw err
    }
    for (let oid in obj) {
      output[oid] = [].concat(obj[oid])
    }
    let str = '未找到二维码中的OID标识编号 '+target
    if (output.hasOwnProperty(target)) {
      output[target] = [].concat(arr)
      str = target+','+output[target].toString()
    }
    storage.set('data', output, function (err) {
      if (err) {
        throw err
      }
      event.sender.send('UpdateByQrcode-reply', str)
    })
  })
})

ipc.on('UpdateByQrcodeShow-message', function (event, arg) {
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
      event.sender.send('UpdateByQrcodeShow-reply', str)
    })
  })
})
