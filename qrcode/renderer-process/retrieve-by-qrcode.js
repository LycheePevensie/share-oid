const ipc = require('electron').ipcRenderer
const QrCode = require('qrcode-reader')

const RetrieveByQrcodeBtn = document.getElementById('retrieve-by-qrcode')

const RetrieveByQrcodeVideo = document.querySelector('#retrieve-by-qrcode-video')
const RetrieveByQrcodeCanvas = document.querySelector('#retrieve-by-qrcode-canvas')
const RetrieveByQrcodeContext = RetrieveByQrcodeCanvas.getContext('2d')
let localMediaStream = null
let onCameraFail = function (e) {}
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
window.URL = window.URL || window.webkitURL
navigator.getUserMedia({video:true}, function (stream) {
  RetrieveByQrcodeVideo.src = window.URL.createObjectURL(stream)
  localMediaStream = stream
}, onCameraFail)

RetrieveByQrcodeBtn.addEventListener('click', function () {
  if (localMediaStream) {
    RetrieveByQrcodeContext.drawImage(RetrieveByQrcodeVideo, 0, 0, 240, 180)
  }
  let data = RetrieveByQrcodeContext.getImageData(0, 0, 240, 180)
  let qr = new QrCode()
  qr.callback = function(result,err) {
    if(result) {
      let str = result
      let arr = str.split(',')
      ipc.send('RetrieveByQrcode-message', arr[0])
    }
  }
  qr.decode(data)
})

ipc.on('RetrieveByQrcode-reply', function (event, arg) {
  let message = `${arg}`
  document.getElementById('retrieve-by-qrcode-reply').innerHTML = message
})
