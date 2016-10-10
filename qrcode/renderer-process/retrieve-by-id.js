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
  document.getElementById('retrieve-by-id-reply').innerHTML = message
  document.getElementById('retrieve-by-id-reply-qrcode').innerHTML = qr_str
})

const RetrieveByIdPDF = document.getElementById('retrieve-by-id-pdf')

RetrieveByIdPDF.addEventListener('click', function (event) {
  ipc.send('RetrieveById-pdf')
})

const RetrieveByIdShow = document.getElementById('retrieve-by-id-show')
const RetrieveByIdShowGender = document.getElementById('retrieve-by-id-show-gender')
const RetrieveByIdShowLocation = document.getElementById('retrieve-by-id-show-location')
const RetrieveByIdShowBirth = document.getElementById('retrieve-by-id-show-birth')

RetrieveByIdShow.addEventListener('click', function () {
  let gender = (RetrieveByIdShowGender.value === '') ? '[0-9].' : RetrieveByIdShowGender.value+'.'
  let location = (RetrieveByIdShowLocation.value === '') ? '[0-9]{3}.' : RetrieveByIdShowLocation.value+'.'
  let birth = (RetrieveByIdShowBirth.value === '') ? '[0-9]{4}.' : (2016-parseInt(RetrieveByIdShowBirth.value)).toString()+'.'
  ipc.send('RetrieveByIdShow-message', '/1.2.156.112606.1.2.1.1.'+gender+location+birth+'/')
})

ipc.on('RetrieveByIdShow-reply', function (event, arg) {
  let message = `${arg}`
  document.getElementById('retrieve-by-id-show-reply').innerHTML = message
})
