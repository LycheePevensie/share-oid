const ipc = require('electron').ipcRenderer

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
  document.getElementById('update-by-id-reply').innerHTML = message
})
