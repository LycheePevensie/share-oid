const ipc = require('electron').ipcRenderer
const qr = require('qr-image')

const UpdateByIdBtn = document.getElementById('update-by-id')
const UpdateByIdInput = document.getElementById('update-by-id-input')

UpdateByIdBtn.addEventListener('click', function () {
  ipc.send('UpdateById-message', UpdateByIdInput.value)
  if (UpdateByIdInput.value !== '') {
    UpdateByIdInput.value = ''
  }
  UpdateByIdInput.placeholder = 'Updated!'
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
