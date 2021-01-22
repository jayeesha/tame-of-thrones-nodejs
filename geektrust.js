const fs = require('fs');
const processMessage = require('./processMessage.js')
const fp = require('lodash/fp')


function commandLineArgument() {
    const args = process.argv.slice(2)
    if (args.length !== 1)
        throw Error('Uh ho! Please enter the file path or ensure that you are passing only one input file path');
    else
        return args[0]
}

function readAndResolveInput(filePath) {
    const readFile = file => fs.readFileSync(file, "utf8")// add error handling
    const trimFile = fileData => fileData.trim()
    const splitByLine = fileData => fileData.split("\n")
    const getInput = eachLine => eachLine.map(line => {
        const allWords = line.split(" ")
        const message = allWords.slice(2).join(" ")
        const senderKingdom = allWords.slice(0, 1).toString()
        const receiverKingdom = allWords.slice(1, 2).toString()
        // console.log({ senderKingdom, receiverKingdom, message })
        return { senderKingdom, receiverKingdom, message }
    })
    // const resolve = result => result.then(res => console.log(res))

    return fp.pipe(
        readFile,
        trimFile,
        splitByLine,
        getInput,
        processMessage.getAllyKingdoms,
        // resolve
    )(filePath)
}

readAndResolveInput(commandLineArgument())

module.exports.readAndResolveInput = readAndResolveInput


