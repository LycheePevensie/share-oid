const storage = require('electron-json-storage')

const demoBtns = document.querySelectorAll('.js-container-target')
// Listen for demo button clicks
Array.prototype.forEach.call(demoBtns, function (btn) {
  btn.addEventListener('click', function (event) {
    event.target.parentElement.classList.toggle('is-open')

    // Save currently active demo button in localStorage
    storage.set('activeDemoButtonId', event.target.getAttribute('id'), function (err) {
      if (err) return console.error(err)
    })
  })
})

// Default to the demo that was active the last time the app was open
storage.get('activeDemoButtonId', function (err, id) {
  if (err) return console.error(err)
  if (id && id.length) document.getElementById(id).click()
})

let InitialEMPIData = {
  "1.2.156.112606.1.2.1.1.1.110.1980.1111":["张三","糖尿病","无"],
  "1.2.156.112606.1.2.1.1.2.310.1990.2222":["李四","急性阑尾炎","青霉素"],
  "1.2.156.112606.1.2.1.1.1.440.2000.3333":["王五","急性肠胃炎","青霉素"],
  "1.2.156.112606.1.2.1.1.2.330.2010.4444":["赵六","上呼吸道感染","无"]
}
storage.set('data', InitialEMPIData, function (err) {
  if (err) return console.error(err)
})
