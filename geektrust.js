const fs = require('fs');
const processMessage = require('./processMessage.js')

try {
    
    const args = process.argv.slice(2);
    if (args.length !== 1) throw Error('Uh ho! Please enter the file path or ensure that you are passing only one input file path');

    const fileData = fs.readFileSync(args[0], "utf8")
    .trim()
    .split("\n")
    .map(line => {
        const allWords = line.split(" ")
        const message = allWords.slice(1).join(" ")
        const kingdom = allWords.slice(0, 1).toString()
        return { kingdom, message }
    })

    
    processMessage.getAllyKingdoms(fileData)

    
}
catch (error) {
    console.log('Error: ', error);
}
