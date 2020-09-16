const fp = require('lodash/fp')
const _ = require("lodash");
var kingdomEmblame = require('./kingdomEmblame')
const cipher = require('./caesarCipher')
const MINIMUM_ALLY_REQUIRED = 3
const MESSAGE_FROM = 'SPACE'
const NOT_FOUND_IN_ARRAY_INDEX = -1


async function getAllyKingdoms(fileData) {

    let kingdom = [
        kingdomEmblame.createObject('SPACE', 'GORILLA'),
        kingdomEmblame.createObject('LAND', 'PANDA'),
        kingdomEmblame.createObject('AIR', 'OWL'),
        kingdomEmblame.createObject('WATER', 'OCTOPUS'),
        kingdomEmblame.createObject('ICE', 'MAMMOTH'),
        kingdomEmblame.createObject('FIRE', 'DRAGON')
    ]

    const allyKingdoms = fileData.map((line) =>
        checkIfAllyKingdom(kingdom, line)
            .then(result => result)
    )

    return await Promise.all(allyKingdoms)
        .then(results => {
            return fp.pipe(
                filterResponse,
                handleResponse
            )(results)
        })
        .catch(e => e)

}

function filterResponse(results) {
    return results.filter((items, index) => results.indexOf(items) === index && items !== undefined)
}

function handleResponse(test) {

    return test.length < MINIMUM_ALLY_REQUIRED ?
        'NONE' :
        `${MESSAGE_FROM} ` + test.toString().replace(/,/g, " ")
}

async function checkIfAllyKingdom(kingdom, line) {


    const kingdomFound = (kingdom, line) => findKingdomByName(kingdom, line.kingdom)

    const searchForKingdom = _.curry(kingdomFound)(kingdom)

    const decryptMessage = (line, kingdom) => {
        const finalMessage = cipher.decrypt(line.message, kingdom.key)
        return { finalMessage, kingdom }
    }

    const inputMessage = _.curry(decryptMessage)(line)

    const emblameFound = objects => {
        const emblameFound = findEmblameFromMessage(objects.finalMessage, objects.kingdom.emblame)
        if (emblameFound) return objects.kingdom.name
    }
    
    const test = await fp.pipe(
        searchForKingdom,
        inputMessage,
        emblameFound
    )(line)

    return test

}

function findKingdomByName(kingdom, name) {
    const result = kingdom.find(kingdom => kingdom.name === name)
    return result ? result : false
}

function findEmblameFromMessage(message, emblame) {

    const test = emblame.split('').reduce((obj, eachEmblameLetter) => {
        const indexFound = obj.remainingArray.indexOf(eachEmblameLetter)
        if (indexFound > NOT_FOUND_IN_ARRAY_INDEX) {
            const assortedString = obj.assortedString + obj.remainingArray.splice(indexFound, 1)
            const remainingArray = obj.remainingArray

            return { remainingArray, assortedString }
        }
        else {
            return { remainingArray: obj.remainingArray, assortedString: obj.assortedString }
        }
    }, { remainingArray: message.split(''), assortedString: "" })

    return test.assortedString === emblame ? true : false
}

module.exports = { getAllyKingdoms, checkIfAllyKingdom, findKingdomByName, findEmblameFromMessage }

