const expect = require('chai').expect
const processMessage = require('../processMessage')

describe('Unit tests for processMessage.js', () => {
    //filterResponse
    describe('filterResponse() - Check whether the duplicate and undefined values are filtered out from the array', () => {
        it('should equal LAND ICE FIRE', () => {
            const input = [ 'LAND', 'ICE', 'ICE', 'ICE', undefined, undefined, 'FIRE' ]
            const outputExpected = [ 'LAND', 'ICE', 'FIRE' ]
            const result = processMessage.filterResponse(input);
            expect(result).to.eql(outputExpected);
        });
    });
    //handleResponse
    describe('handleResponse() - Return the sending kingdom plus ally kingdoms only if no. of ally kingdoms is 3 or more', () => {
        it('should equal SPACE LAND ICE FIRE', () => {
            const input = [ 'LAND', 'ICE', 'FIRE' ]
            const outputExpected = 'SPACE LAND ICE FIRE'
            const result = processMessage.handleResponse(input);
            expect(result).to.equal(outputExpected);
        });
    });
    describe('handleResponse() - Return NONE if no. of ally kingdoms is less than 3', () => {
        it('should equal NONE', () => {
            const input = [ 'ICE', 'FIRE' ]
            const outputExpected = 'NONE'
            const result = processMessage.handleResponse(input);
            expect(result).to.equal(outputExpected);
        });
    });
    //getAllyKingdoms
    describe('getAllyKingdoms() - Check async function getAllyKingdoms to return the ally kingdoms', () => {
        it('should equal NONE', () => {
            const input = [{ kingdom: 'LAND', message: 'FDIXXSOKKOFBBMU' },
            { kingdom: 'ICE', message: 'MOMAMVTMTMHTM' },
            { kingdom: 'WATER', message: 'SUMMER IS COMING' },
            { kingdom: 'AIR', message: 'OWLAOWLBOWLC' },
            { kingdom: 'FIRE', message: 'AJXGAMUTA' }]
            const outputExpected= 'SPACE LAND ICE FIRE'
            processMessage.getAllyKingdoms(input).then(
                result => expect(result).to.equal(outputExpected)
            )
        });
    });
    describe('getAllyKingdoms() - Check async function getAllyKingdoms to return NONE if no. of ally kingdoms less than 3', () => {
        it('should equal NONE', () => {
            const input = [{ kingdom: 'AIR', message: 'OWLAOWLBOWLC' },
            { kingdom: 'LAND', message: 'OFBBMUFDICCSO' },
            { kingdom: 'ICE', message: 'VTBTBHTBBBOBAB' },
            { kingdom: 'WATER', message: 'SUMMER IS COMING' }]
            const outputExpected= 'NONE'
            processMessage.getAllyKingdoms(input).then(
                result => expect(result).to.equal(outputExpected)
            )
        });
    });

})