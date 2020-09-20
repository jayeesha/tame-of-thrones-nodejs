const fp = require('lodash/fp')

const kingdomEmblame = require('./kingdomEmblame')
const checkAlly = require('./checkAlly')

const MINIMUM_ALLY_REQUIRED = 3
const MESSAGE_FROM = 'SPACE'


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
            checkAlly.checkIfAllyKingdom(kingdom, line)
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


module.exports = { getAllyKingdoms, filterResponse, handleResponse }

