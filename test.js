var fs = require('fs');

var contents = fs.readFileSync("./test.txt", 'utf8');
var knocks = [];
var current = {};

contents.split("\n").forEach(function(line){

  var m = line.match(/^KNOCK DETECTED at (\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/);
  if(m){
    if(Object.keys(current).length){
      knocks.push(current);
    }
    current = {};
    current.date = new Date(m[1], m[2], m[3], m[4], m[5], m[6]);
  }
  m = line.match(/^([^:]+): (.+)$/);
  if(m){
    console.log(m)
    current[m[1]] = parseFloat(m[2]);
  }

});
if(Object.keys(current).length){
  knocks.push(current);
}
var csv = ConvertToCSV(knocks);
console.log(csv);
fs.writeFileSync('./test.csv', csv)


function ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    // captions
    if(array.length){
      var headers = [];
      for (var index in array[0]) {
          headers.push(index);
      }
      str += headers.join(",");
    }

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\n';
    }

    return str;
}
