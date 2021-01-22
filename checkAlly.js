const _ = require("lodash");
const fp = require('lodash/fp')


const cipher = require('./caesarCipher')
const NOT_FOUND_IN_ARRAY_INDEX = -1
const result = { "SPACE": [], "LAND": [], "ICE": [], "AIR": [], "WATER": [], "FIRE": [] }

async function checkIfAllyKingdom(kingdom, line) {

    const kingdomFound = (kingdom, line) => findKingdomByName(kingdom, line.receiverKingdom)

    const searchForKingdom = _.curry(kingdomFound)(kingdom)

    const decryptMessage = (line, kingdom) => {
        const finalMessage = cipher.decrypt(line.message, kingdom.key)
        return { finalMessage, kingdom }
    }

    const inputMessage = _.curry(decryptMessage)(line)

    const emblameFound = decryptedMessageAndKingdom => {
        // console.log(decryptedMessageAndKingdom)
        // console.log("line---",line)
        const emblameFound = findEmblameFromMessage(decryptedMessageAndKingdom.finalMessage, decryptedMessageAndKingdom.kingdom.emblame)
        if (emblameFound) {
            result[line.senderKingdom].push(line.receiverKingdom)
            return result
        }
    }

    const allyKingdom = fp.pipe(
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