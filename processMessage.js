const kingdomEmblame = require('./kingdomEmblame')
const cipher = require('./caesarCipher')
const MINIMUM_ALLY_REQUIRED = 3
const MESSAGE_FROM = 'SPACE'
const NOT_FOUND_IN_ARRAY_INDEX = -1


async function getAllyKingdoms(fileData) {
    
    const kingdom = [
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

    Promise.all(allyKingdoms)
        .then(results => {
            const test = filterResponse(results)
            handleResponse(test)
        })
        .catch(e => {
            console.error(e);
        })

}

function filterResponse(results) {
    return results.filter((items, index) => results.indexOf(items) === index && items !== undefined)
}
function handleResponse(test) {

    const outputString = test.length < MINIMUM_ALLY_REQUIRED ?
        'NONE' :
        `${MESSAGE_FROM} ` + test.toString().replace(/,/g, " ")
    console.log(outputString)
}

async function checkIfAllyKingdom(kingdom, line) {

    const kingdomFound = await findKingdomByName(kingdom, line.kingdom)

    if (!kingdomFound) return
    const key = await kingdomFound.key

    const inputMessage = await cipher.decrypt(line.message, key)
    console.log("decrypted", inputMessage)

    const emblame = await kingdomFound.emblame
    const emblameFound = await findEmblameFromMessage(inputMessage.split(''), emblame.split(''))

    console.log("emblame found", emblameFound)
    if (emblameFound) return kingdomFound.name

}

function findKingdomByName(kingdom, name) {
    const result = kingdom.find(kingdom => kingdom.name === name)
    if (result) return result
}

async function findEmblameFromMessage(message, emblame) {

    const test = await emblame.reduce((obj, eachEmblameLetter) => {
        const indexFound = obj.remainingArray.indexOf(eachEmblameLetter)
        if (indexFound > NOT_FOUND_IN_ARRAY_INDEX) {
            const assortedString = obj.assortedString + obj.remainingArray.splice(indexFound, 1)
            const remainingArray = obj.remainingArray

            return { remainingArray, assortedString }
        }
        else {
            return { remainingArray: obj.remainingArray, assortedString: obj.assortedString }
        }
    }, { remainingArray: message, assortedString: "" })
    if (test.assortedString) return test.assortedString
}

module.exports = { getAllyKingdoms, checkIfAllyKingdom, findKingdomByName, findEmblameFromMessage }

