var fs = require('fs');
var path = require('path');
var output = new Object();
var target = "1.1.3";
fs.readFile(path.join(__dirname, 'data.json'), function (err, input) {
  if (err) {
    throw err;
  }
  var obj = JSON.parse(input);
  for (var oid in obj) {
    output[oid] = [].concat(obj[oid]);
  }
  var str = "Not Found!";
  if (output.hasOwnProperty(target)) {
    str = output[target].toString();
  }
  fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(output), function (err) {
    if (err) {
      throw err;
    }
    console.log(str);
  });
});
