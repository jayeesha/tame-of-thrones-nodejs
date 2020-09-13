
const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const NOT_FOUND_IN_ARRAY_INDEX = -1

function decrypt(message, key) {
    
    const decryptedString = message.split('').reduce((decryptedString, letter) => {
        const position = alphabets.indexOf(letter)
        if (position > NOT_FOUND_IN_ARRAY_INDEX) {
            return decryptedString + alphabets[getShiftedIndex(position, key)]
        }
        else {
            return decryptedString + letter
        }
    }, "")

    return decryptedString
}

function getShiftedIndex(position, key) {
    return position - key >= 0 ? position - key : (26 - (key - position))
}

module.exports.decrypt = decrypt