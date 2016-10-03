const ipc = require('electron').ipcRenderer
const QrCode = require('qrcode-reader')

const UpdateByQrcodeBtn = document.getElementById('update-by-qrcode')

const UpdateByQrcodeVideo = document.querySelector('#update-by-qrcode-video')
const UpdateByQrcodeCanvas = document.querySelector('#update-by-qrcode-canvas')
const UpdateByQrcodeContext = UpdateByQrcodeCanvas.getContext('2d')
let localMediaStream = null
let onCameraFail = function (e) {}
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
window.URL = window.URL || window.webkitURL
navigator.getUserMedia({video:true}, function (stream) {
  UpdateByQrcodeVideo.src = window.URL.createObjectURL(stream)
  localMediaStream = stream
}, onCameraFail)

UpdateByQrcodeBtn.addEventListener('click', function () {
  if (localMediaStream) {
    UpdateByQrcodeContext.drawImage(UpdateByQrcodeVideo, 0, 0, 240, 180)
  }
  let data = UpdateByQrcodeContext.getImageData(0, 0, 240, 180)
  let qr = new QrCode()
  qr.callback = function(result,err) {
    if(result) {
      let str = result
      ipc.send('UpdateByQrcode-message', str)
    }
  }
  qr.decode(data)
})

ipc.on('UpdateByQrcode-reply', function (event, arg) {
  let message = `${arg}`
  document.getElementById('update-by-qrcode-reply').innerHTML = message
})
