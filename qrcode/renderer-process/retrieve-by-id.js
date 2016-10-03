const ipc = require('electron').ipcRenderer
const qr = require('qr-image')

const RetrieveByIdBtn = document.getElementById('retrieve-by-id')
const RetrieveByIdInput = document.getElementById('retrieve-by-id-input')

RetrieveByIdBtn.addEventListener('click', function () {
  ipc.send('RetrieveById-message', RetrieveByIdInput.value)
  if (RetrieveByIdInput.value !== '') {
    RetrieveByIdInput.value = ''
  }
  RetrieveByIdInput.placeholder = 'Retrieved!'
})

ipc.on('RetrieveById-reply', function (event, arg) {
  let message = `${arg}`
  let qr_str = qr.imageSync(message, {type: 'svg', size: '5'})
  document.getElementById('retrieve-by-id-reply').innerHTML = qr_str
})
