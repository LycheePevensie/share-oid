const ipc = require('electron').ipcRenderer
const QrCode = require('qrcode-reader')

const DeleteByQrcodeBtn = document.getElementById('delete-by-qrcode')

const DeleteByQrcodeVideo = document.querySelector('#delete-by-qrcode-video')
const DeleteByQrcodeCanvas = document.querySelector('#delete-by-qrcode-canvas')
const DeleteByQrcodeContext = DeleteByQrcodeCanvas.getContext('2d')
let localMediaStream = null
let onCameraFail = function (e) {}
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
window.URL = window.URL || window.webkitURL
navigator.getUserMedia({video:true}, function (stream) {
  DeleteByQrcodeVideo.src = window.URL.createObjectURL(stream)
  localMediaStream = stream
}, onCameraFail)

DeleteByQrcodeBtn.addEventListener('click', function () {
  if (localMediaStream) {
    DeleteByQrcodeContext.drawImage(DeleteByQrcodeVideo, 0, 0, 240, 180)
  }
  let data = DeleteByQrcodeContext.getImageData(0, 0, 240, 180)
  let qr = new QrCode()
  qr.callback = function(result,err) {
    if(result) {
      let str = result
      let arr = str.split(',')
      ipc.send('DeleteByQrcode-message', arr[0])
    }
  }
  qr.decode(data)
})

ipc.on('DeleteByQrcode-reply', function (event, arg) {
  let message = `${arg}`
  document.getElementById('delete-by-qrcode-reply').innerHTML = message
})
