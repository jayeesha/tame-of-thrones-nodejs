const fp = require('lodash/fp')

const kingdomEmblame = require('./kingdomEmblame')
const checkAlly = require('./checkAlly')

const MINIMUM_ALLY_REQUIRED = 3
const MESSAGE_FROM = 'SPACE'


async function getAllyKingdoms(fileData) {

    let kingdom = [
        kingdomEmblame.createObject('SPACE', 'GORILLA'),// Emblem
        kingdomEmblame.createObject('LAND', 'PANDA'),
        kingdomEmblame.createObject('AIR', 'OWL'),
        kingdomEmblame.createObject('WATER', 'OCTOPUS'),
        kingdomEmblame.createObject('ICE', 'MAMMOTH'),
        kingdomEmblame.createObject('FIRE', 'DRAGON')
    ]

    const allyKingdoms = fileData.map((line) =>
        checkAlly.checkIfAllyKingdom(kingdom, line)
            .then(result => result)
    )

    // allyKingdoms()
    // await console.log("allies ", allyKingdoms)
    return await Promise.all(allyKingdoms)
                        .then(results => {
                            return fp.pipe(
                                filterResponse,
                                handleResponse
                            )(results)
                        })

}

function filterResponse(results) {

    return results.filter((items, index) => items !== undefined)
    
}

function handleResponse(test) {
    const finalObject = test[test.length-1]
    var maxLength = 0
    var kingdomWithMaxAllies = ""
    for( senderKingdom in finalObject){
        if(maxLength < finalObject[senderKingdom].length){
            maxLength = finalObject[senderKingdom].length
            kingdomWithMaxAllies = senderKingdom
        }
    }

    console.log(kingdomWithMaxAllies)
}


module.exports = { getAllyKingdoms, filterResponse, handleResponse }

