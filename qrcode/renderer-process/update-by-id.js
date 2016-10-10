const ipc = require('electron').ipcRenderer
const qr = require('qr-image')

const UpdateByIdBtn = document.getElementById('update-by-id')
const UpdateByIdInputIdentifier = document.getElementById('update-by-id-input-identifier')
const UpdateByIdInputName = document.getElementById('update-by-id-input-name')
const UpdateByIdInputPathema = document.getElementById('update-by-id-input-pathema')
const UpdateByIdInputOthers = document.getElementById('update-by-id-input-others')

UpdateByIdBtn.addEventListener('click', function () {
  ipc.send('UpdateById-message', UpdateByIdInputIdentifier.value+';'+UpdateByIdInputName.value+';'+UpdateByIdInputPathema.value+';'+UpdateByIdInputOthers.value)
  UpdateByIdInputIdentifier.value = ''
  UpdateByIdInputName.value = ''
  UpdateByIdInputPathema.value = ''
  UpdateByIdInputOthers.value = ''
})

ipc.on('UpdateById-reply', function (event, arg) {
  let message = `${arg}`
  let qr_str = qr.imageSync(message, {type: 'svg', size: '5'})
  document.getElementById('update-by-id-reply').innerHTML = message
  document.getElementById('update-by-id-reply-qrcode').innerHTML = qr_str
})

const UpdateByIdPDF = document.getElementById('update-by-id-pdf')

UpdateByIdPDF.addEventListener('click', function (event) {
  ipc.send('UpdateById-pdf')
})

const UpdateByIdShow = document.getElementById('update-by-id-show')

UpdateByIdShow.addEventListener('click', function () {
  ipc.send('UpdateByIdShow-message', 'show')
})

ipc.on('UpdateByIdShow-reply', function (event, arg) {
  let message = `${arg}`
  document.getElementById('update-by-id-show-reply').innerHTML = message
})
