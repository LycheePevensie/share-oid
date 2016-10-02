const ipc = require('electron').ipcRenderer

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
  document.getElementById('create-by-id-reply').innerHTML = message
})
