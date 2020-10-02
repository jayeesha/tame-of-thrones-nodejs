const expect = require('chai').expect
const checkAlly = require('../checkAlly')
const kingdomEmblame = require('../kingdomEmblame')

describe('Unit tests for checkAlly.js', () => {
    var kingdomObject
    before(() => {
        kingdomObject = [
            kingdomEmblame.createObject('SPACE', 'GORILLA'),
            kingdomEmblame.createObject('LAND', 'PANDA'),
            kingdomEmblame.createObject('AIR', 'OWL'),
            kingdomEmblame.createObject('WATER', 'OCTOPUS'),
            kingdomEmblame.createObject('ICE', 'MAMMOTH'),
            kingdomEmblame.createObject('FIRE', 'DRAGON')]
    })
    //findKingdomByName
    describe('findKingdomByName() - check whether LAND kingdom exists among the kingdoms', () => {
        it('should equal to the object which contains LAND', () => {
            const input = "LAND"
            const result = checkAlly.findKingdomByName(kingdomObject, input);
            const outputExpected = { name: 'LAND', emblame: 'PANDA', key: 5 }
            expect(result).to.eql(outputExpected);

        });
    });
    describe('findKingdomByName() - check whether RANDOM kingdom exists among the kingdoms', () => {
        it('should equal to false if it doesnt contain RANDOM', () => {
            const input = "RANDOM"
            const result = checkAlly.findKingdomByName(kingdomObject, input);
            expect(result).to.be.false;

        });
    });
    //findEmblameFromMessage
    describe('findEmblameFromMessage() - find whether PANDA emblame exists in decrypted message AYDSSNJFFJAWWHP', () => {
        it('should be equal to true', () => {
            const message = 'AYDSSNJFFJAWWHP'
            const emblame = 'PANDA'

            const result = checkAlly.findEmblameFromMessage(message, emblame);
            expect(result).to.be.true;
        });
    });

    describe('findEmblameFromMessage() - find whether emblame OWL exists in decrypted message LTIXLTIYLTIZ', () => {
        it('should be equal to false', () => {
            const message = 'LTIXLTIYLTIZ'
            const emblame = 'OWL'

            const result = checkAlly.findEmblameFromMessage(message, emblame);
            expect(result).to.be.false;
        });
    });
    // checkIfAllyKingdom
    describe('checkIfAllyKingdom() - Check whether async checkIfAllyKingdom gives correct kingdom if valid encrypted message is passed', () => {
        it('should equal LAND', () => {
            const input = { kingdom: "LAND", message: "FDIXXSOKKOFBBMU" }
            checkAlly.checkIfAllyKingdom(kingdomObject, input)
                .then(result =>
                    expect(result).to.equal('LAND')
                )
        });
    });
    describe('checkIfAllyKingdom() - Check whether async checkIfAllyKingdom gives undefined if invalid encrypted message is passed', () => {
        it('should equal undefined', () => {
            const input = { kingdom: "WATER", message: "SUMMER IS COMING" }
            checkAlly.checkIfAllyKingdom(kingdomObject, input)
                .then(result =>
                    expect(result).to.be.undefined
                )
        });
    });
    describe('checkIfAllyKingdom() - Check whether async checkIfAllyKingdom gives correct kingdom if valid encrypted message with spaces between words is passed', () => {
        it('should equal WATER', () => {
            const input = { kingdom: "WATER", message: "SUMMER IS VJAVWBZ" }
            checkAlly.checkIfAllyKingdom(kingdomObject, input)
                .then(result =>
                    expect(result).to.equal('WATER')
                )
        });
    });

});
