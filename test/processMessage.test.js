const expect = require('chai').expect
const processMessage = require('../processMessage')


describe('processMessage.checkIfAllyKingdom() unit tests', () => {
    describe('processMessage.checkIfAllyKingdom() Test', () => {
        it('should equal LAND', () => {
            const input ={
                kingdom:'LAND',
                message:'FDIXXSOKKOFBBMU'
            }
            const result = processMessage.checkIfAllyKingdom(input);
            expect(result).to.equal('LAND');
        });
    });
    describe('processMessage.checkIfAllyKingdom() Test', () => {
        it('should equal WATER', () => {
            const input ={
                kingdom:'WATER',
                message:'SUMMER IS VJAVWBZ'
            }
            const result = processMessage.checkIfAllyKingdom(input);
            expect(result).to.equal('WATER');
        });
    });
    describe('processMessage.checkIfAllyKingdom() Test', () => {
        it('should equal false', () => {
            const input ={
                kingdom:'AIR',
                message:'OWLAOWLBOWLC'
            }
            const result = processMessage.checkIfAllyKingdom(input);
            expect(result).to.equal(undefined);
        });
    });
})

describe('processMessage.findEmblameFromMessage() unit tests', () => {
    describe('processMessage.findEmblameFromMessage() ', () => {
        it('should equal PANDA', () => {
            const message = 'AYDSSNJFFJAWWHP' 
            const emblame = 'PANDA'

            const result = processMessage.findEmblameFromMessage(message, emblame);
            expect(result).to.equal('PANDA');
        });
    });

    describe('processMessage.findEmblameFromMessage() ', () => {
        it('should return nothing', () => {
            const message = 'LTIXLTIYLTIZ' 
            const emblame = 'OWL'

            const result = processMessage.findEmblameFromMessage(message, emblame);
            expect(result).to.equal(false);
        });
    });
});


// describe('Tame of thrones integrated tests', () => {
//     describe('Final output Test for SPACE', () => {
//         it('should equal LAND ICE WATER FIRE', () => {
//             const input = [ 
//            { kingdom: 'LAND', message: 'FDIXXSOKKOFBBMU' },
//            { kingdom: 'ICE', message: 'MOMAMVTMTMHTM' },
//            { kingdom: 'WATER', message: 'SUMMER IS VJAVWBZ' },
//            { kingdom: 'AIR', message: 'OWLAOWLBOWLC' },
//            { kingdom: 'FIRE', message: 'AJXGAMUTA' },
//            { kingdom: 'RANDOM', message: 'AJXGAMUTA' }]

//             const outputExpected = 'SPACE LAND ICE WATER FIRE'
//             const result = processMessage.getAllyKingdoms(input);
//             expect(result).to.eql(outputExpected);
//         });
//     });
//     describe('Final output Test for SPACE', () => {
//         it('should equal NONE', () => {
//             const input = [ 
//            { kingdom: 'AIR', message: 'OWLAOWLBOWLC' },
//            { kingdom: 'LAND', message: 'OFBBMUFDICCSO' },
//            { kingdom: 'ICE', message: 'VTBTBHTBBBOBAB' },
//            { kingdom: 'WATER', message: 'SUMMER IS COMING' }]

//             const result = processMessage.getAllyKingdoms(input);
//             expect(result).to.eql('NONE');
//         });
//     });
//     describe('Final output Test for SPACE', () => {
//         it('should equal NONE', () => {
//             const input = [ 
//            { kingdom: 'AIR', message: 'OWLAOWLBOWLC' },
//            { kingdom: 'LAND', message: 'OFBBMUFDICCSO' }]

//             const result = processMessage.getAllyKingdoms(input);
//             expect(result).to.eql('NONE');
//         });
//     });
// })