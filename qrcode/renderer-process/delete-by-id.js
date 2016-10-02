const ipc = require('electron').ipcRenderer

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
  document.getElementById('delete-by-id-reply').innerHTML = message
})
