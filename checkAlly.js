const _ = require("lodash");
const fp = require('lodash/fp')


const cipher = require('./caesarCipher')
const NOT_FOUND_IN_ARRAY_INDEX = -1


async function checkIfAllyKingdom(kingdom, line) {

    const kingdomFound = (kingdom, line) => findKingdomByName(kingdom, line.kingdom)

    const searchForKingdom = _.curry(kingdomFound)(kingdom)

    const decryptMessage = (line, kingdom) => {
        const finalMessage = cipher.decrypt(line.message, kingdom.key)
        return { finalMessage, kingdom }
    }

    const inputMessage = _.curry(decryptMessage)(line)

    const emblameFound = decryptedMessageAndKingdom => {
        const emblameFound = findEmblameFromMessage(decryptedMessageAndKingdom.finalMessage, decryptedMessageAndKingdom.kingdom.emblame)
        if (emblameFound) return decryptedMessageAndKingdom.kingdom.name
    }

    const allyKingdom = await fp.pipe(
        searchForKingdom,
        inputMessage,
        emblameFound
    )(line)

    return allyKingdom

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

module.exports = { checkIfAllyKingdom, findKingdomByName, findEmblameFromMessage }