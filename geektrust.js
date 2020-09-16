const fs = require('fs');
const processMessage = require('./processMessage.js')
const fp = require('lodash/fp')


const args = process.argv.slice(2);
if (args.length !== 1) throw Error('Uh ho! Please enter the file path or ensure that you are passing only one input file path');

function readAndResolveInput(filePath) {
    const readFile = file => fs.readFileSync(file, "utf8")
    const trimFile = fileData => fileData.trim()
    const splitByLine = fileData => fileData.split("\n")
    const getInput = eachLine => eachLine.map(line => {
        const allWords = line.split(" ")
        const message = allWords.slice(1).join(" ")
        const kingdom = allWords.slice(0, 1).toString()
        return { kingdom, message }
    })
    const resolve = result => result.then(res => console.log(res))

    return fp.pipe(
        readFile,
        trimFile,
        splitByLine,
        getInput,
        processMessage.getAllyKingdoms,
        resolve
    )(filePath)
}

readAndResolveInput(args[0])



