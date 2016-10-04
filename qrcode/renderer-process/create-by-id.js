const ipc = require('electron').ipcRenderer
const qr = require('qr-image')

const CreateByIdBtn = document.getElementById('create-by-id')
const CreateByIdInput = document.getElementById('create-by-id-input')

CreateByIdBtn.addEventListener('click', function () {
  ipc.send('CreateById-message', CreateByIdInput.value)
  if (CreateByIdInput.value !== '') {
    CreateByIdInput.value = ''
  }
  CreateByIdInput.placeholder = 'Created!'
})

ipc.on('CreateById-reply', function (event, arg) {
  let message = `${arg}`
  let qr_str = qr.imageSync(message, {type: 'svg', size: '5'})
  document.getElementById('create-by-id-reply').innerHTML = message
  document.getElementById('create-by-id-reply-qrcode').innerHTML = qr_str
})

const CreateByIdPDF = document.getElementById('create-by-id-pdf')

CreateByIdPDF.addEventListener('click', function (event) {
  ipc.send('CreateById-pdf')
})

const CreateByIdShow = document.getElementById('create-by-id-show')

CreateByIdShow.addEventListener('click', function () {
  ipc.send('CreateByIdShow-message', 'show')
})

ipc.on('CreateByIdShow-reply', function (event, arg) {
  let message = `${arg}`
  document.getElementById('create-by-id-show-reply').innerHTML = message
})
