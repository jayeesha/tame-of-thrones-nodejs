const expect = require('chai').expect
const sinon = require('sinon')
const checkAlly = require('../checkAlly')
const kingdomEmblame = require('../kingdomEmblame')

describe('Unit tests for checkAlly.js', () => {
    var kingdom
    before(() => {
        kingdom = [
            kingdomEmblame.createObject('SPACE', 'GORILLA'),
            kingdomEmblame.createObject('LAND', 'PANDA'),
            kingdomEmblame.createObject('AIR', 'OWL'),
            kingdomEmblame.createObject('WATER', 'OCTOPUS'),
            kingdomEmblame.createObject('ICE', 'MAMMOTH'),
            kingdomEmblame.createObject('FIRE', 'DRAGON')]
    })
    //findKingdomByName
    describe('check whether LAND exists among the kingdoms', () => {
        it('should equal to the object which contains LAND', () => {
            const input = "LAND"
            const result = checkAlly.findKingdomByName(kingdom, input);
            const outputExpected = { name: 'LAND', emblame: 'PANDA', key: 5 }
            expect(result).to.eql(outputExpected);

        });
    });
    describe('check whether RANDOM exists among the kingdoms', () => {
        it('should equal to false if it doesnt contain RANDOM', () => {
            const input = "RANDOM"
            const result = checkAlly.findKingdomByName(kingdom, input);
            expect(result).to.be.false;

        });
    });
    //findEmblameFromMessage
    describe('find whether emblame exists in decoded message', () => {
        it('should be equal to true', () => {
            const message = 'AYDSSNJFFJAWWHP'
            const emblame = 'PANDA'

            const result = checkAlly.findEmblameFromMessage(message, emblame);
            expect(result).to.be.true;
        });
    });

    describe('find whether emblame exists in decoded message', () => {
        it('should be equal to false', () => {
            const message = 'LTIXLTIYLTIZ'
            const emblame = 'OWL'

            const result = checkAlly.findEmblameFromMessage(message, emblame);
            expect(result).to.be.false;
        });
    });
    // checkIfAllyKingdom
    describe('processMessage.checkIfAllyKingdom() unit tests', () => {
        describe('processMessage.checkIfAllyKingdom() Test', () => {
            it('should equal LAND', () => {
                const input = { kingdom: "LAND", message: "FDIXXSOKKOFBBMU" }
                const result = checkAlly.checkIfAllyKingdom(kingdom, input);
                expect(result).to.equal('LAND');
            });
        });
        // describe('processMessage.checkIfAllyKingdom() Test', () => {
        //     it('should equal WATER', () => {
        //         const input = {
        //             kingdom: 'WATER',
        //             message: 'SUMMER IS VJAVWBZ'
        //         }
        //         const result = processMessage.checkIfAllyKingdom(input);
        //         expect(result).to.equal('WATER');
        //     });
        // });
        // describe('processMessage.checkIfAllyKingdom() Test', () => {
        //     it('should equal false', () => {
        //         const input = {
        //             kingdom: 'AIR',
        //             message: 'OWLAOWLBOWLC'
        //         }
        //         const result = processMessage.checkIfAllyKingdom(input);
        //         expect(result).to.equal(undefined);
        //     });
        // });
    })
});
