const ipc = require('electron').ipcRenderer
const qr = require('qr-image')

const DeleteByIdBtn = document.getElementById('delete-by-id')
const DeleteByIdInput = document.getElementById('delete-by-id-input')

DeleteByIdBtn.addEventListener('click', function () {
  ipc.send('DeleteById-message', DeleteByIdInput.value)
  if (DeleteByIdInput.value !== '') {
    DeleteByIdInput.value = ''
  }
  DeleteByIdInput.placeholder = 'Deleted!'
})

ipc.on('DeleteById-reply', function (event, arg) {
  let message = `${arg}`
  let qr_str = qr.imageSync(message, {type: 'svg', size: '5'})
  document.getElementById('delete-by-id-reply').innerHTML = message
  document.getElementById('delete-by-id-reply-qrcode').innerHTML = qr_str
})

const DeleteByIdPDF = document.getElementById('delete-by-id-pdf')

DeleteByIdPDF.addEventListener('click', function (event) {
  ipc.send('DeleteById-pdf')
})

const DeleteByIdShow = document.getElementById('delete-by-id-show')

DeleteByIdShow.addEventListener('click', function () {
  ipc.send('DeleteByIdShow-message', 'show')
})

ipc.on('DeleteByIdShow-reply', function (event, arg) {
  let message = `${arg}`
  document.getElementById('delete-by-id-show-reply').innerHTML = message
})
