const ipc = require('electron').ipcRenderer

const RetrieveByIdBtn = document.getElementById('retrieve-by-id')
const RetrieveByIdInput = document.getElementById('retrieve-by-id-input')

RetrieveByIdBtn.addEventListener('click', function () {
  ipc.send('RetrieveById-message', RetrieveByIdInput.value)
  RetrieveByIdInput.placeholder = 'Retrieved!'
})

ipc.on('RetrieveById-reply', function (event, arg) {
  let message = `${arg}`
  document.getElementById('retrieve-by-id-reply').innerHTML = message
})
