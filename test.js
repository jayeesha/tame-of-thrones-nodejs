var fs = require('fs')

fs.readFile('input.txt', 'utf8', function(err, contents){
  console.log(contents.split("\n"))
})

