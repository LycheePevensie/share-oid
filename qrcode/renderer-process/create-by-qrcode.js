const ipc = require('electron').ipcRenderer
const QrCode = require('qrcode-reader')

const CreateByQrcodeBtn = document.getElementById('create-by-qrcode')

const CreateByQrcodeVideo = document.querySelector('#create-by-qrcode-video')
const CreateByQrcodeCanvas = document.querySelector('#create-by-qrcode-canvas')
const CreateByQrcodeContext = CreateByQrcodeCanvas.getContext('2d')
let localMediaStream = null
let onCameraFail = function (e) {}
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
window.URL = window.URL || window.webkitURL
navigator.getUserMedia({video:true}, function (stream) {
  CreateByQrcodeVideo.src = window.URL.createObjectURL(stream)
  localMediaStream = stream
}, onCameraFail)

CreateByQrcodeBtn.addEventListener('click', function () {
  if (localMediaStream) {
    CreateByQrcodeContext.drawImage(CreateByQrcodeVideo, 0, 0, 240, 180)
  }
  let data = CreateByQrcodeContext.getImageData(0, 0, 240, 180)
  let qr = new QrCode()
  qr.callback = function(result,err) {
    if(result) {
      let str = result
      ipc.send('CreateByQrcode-message', str)
    }
  }
  qr.decode(data)
})

ipc.on('CreateByQrcode-reply', function (event, arg) {
  let message = `${arg}`
  document.getElementById('create-by-qrcode-reply').innerHTML = message
})

const CreateByQrcodeShow = document.getElementById('create-by-qrcode-show')

CreateByQrcodeShow.addEventListener('click', function () {
  ipc.send('CreateByQrcodeShow-message', 'show')
})

ipc.on('CreateByQrcodeShow-reply', function (event, arg) {
  let message = `${arg}`
  document.getElementById('create-by-qrcode-show-reply').innerHTML = message
})
