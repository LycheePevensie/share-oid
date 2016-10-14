const ipc = require('electron').ipcMain
const storage = require('electron-json-storage')

ipc.on('CreateByQrcode-message', function (event, arg) {
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
    let str = 'Already Have '+target+' !'
    if (!output.hasOwnProperty(target)) {
      output[target] = [].concat(arr)
      str = target+','+output[target].toString()
    }
    storage.set('data', output, function (err) {
      if (err) {
        throw err
      }
      event.sender.send('CreateByQrcode-reply', str)
    })
  })
})

ipc.on('CreateByQrcodeShow-message', function (event, arg) {
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
      event.sender.send('CreateByQrcodeShow-reply', str)
    })
  })
})
