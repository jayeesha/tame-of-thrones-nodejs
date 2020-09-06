const kingdomEmblame = require('./kingdomEmblame')
const cipher = require('./caesarCipher')
const MINIMUM_ALLY_REQUIRED = 3
const MESSAGE_FROM = 'SPACE'
const NOT_FOUND_IN_ARRAY_INDEX = -1

const kingdom = [
    kingdomEmblame.createObject('SPACE', 'GORILLA'),
    kingdomEmblame.createObject('LAND', 'PANDA'),
    kingdomEmblame.createObject('AIR', 'OWL'),
    kingdomEmblame.createObject('WATER', 'OCTOPUS'),
    kingdomEmblame.createObject('ICE', 'MAMMOTH'),
    kingdomEmblame.createObject('FIRE', 'DRAGON')
]


function getAllyKingdoms(fileData) {
    let allyKingdoms = []
    fileData.forEach((line) => {
        const kingdom = checkIfAllyKingdom(line)
        kingdom && !allyKingdoms.includes(kingdom) ? allyKingdoms.push(kingdom) : false
    })

    const outputString = allyKingdoms.length < MINIMUM_ALLY_REQUIRED ? 
                        'NONE' :
                        `${MESSAGE_FROM} `+allyKingdoms.toString().replace(/,/g," ")
    return outputString
}

function checkIfAllyKingdom(line) {
        let inputMessage = line.message
        const inputKingdom = line.kingdom
        const kingdomFound = findKingdomByName(inputKingdom)
        
        if(!kingdomFound) return
        const emblame = kingdomFound.emblame
        const key = kingdomFound.key

        inputMessage = cipher.decrypt(inputMessage, key)
        const emblameFound = findEmblameFromMessage(inputMessage, emblame)
                
        if(!emblameFound) {
            return
        }
        else {
            return kingdomFound.name
        }

}

function findKingdomByName(name){
    return kingdom.find(kingdom => kingdom.name === name)
}

function findEmblameFromMessage(message, emblame) {
    message = message.split('')
    let assortedString = ''

    emblame.split('').forEach(eachEmblameLetter =>{
        const indexFound = message.indexOf(eachEmblameLetter)
        if(indexFound > NOT_FOUND_IN_ARRAY_INDEX) {
            assortedString += message.splice(indexFound, 1)
        }
    })
    
    return assortedString === emblame ? assortedString : false;
}

module.exports = { getAllyKingdoms, checkIfAllyKingdom, findEmblameFromMessage }

