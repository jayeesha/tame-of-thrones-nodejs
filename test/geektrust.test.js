const sinon = require('sinon')
const expect = require('chai').expect

describe('Integration test', () => {
    let consoleOutput
    beforeEach(() => {
        process.argv[2] = './mocks/input.txt'
        geektrust = require('../geektrust')
        consoleOutput = sinon.stub(console, 'log')
    })

    afterEach(()=>{
        consoleOutput.restore()
    })
    
    describe('readAndResolveInput() - ', () => {
        it('should call console once and log SPACE LAND ICE FIRE', () => {
            expect( consoleOutput.calledOnce ).to.be.true;
            expect( consoleOutput.calledWith('SPACE LAND ICE FIRE') ).to.be.true;
        })
    })
})
