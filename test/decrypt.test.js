const expect = require('chai').expect
const cipher = require('../caesarCipher')

describe('caesarCipher.js unit tests', () => {
    describe('decrypt() Test', () => {
        it('should equal ABCD', () => {
            const result = cipher.decrypt('CDEF',2);
            expect(result).to.equal('ABCD');
        });
    });

    describe('decrypt() Test', () => {
        it('should equal YZAB', () => {
            const result = cipher.decrypt('ABCD',2);
            expect(result).to.equal('YZAB');
        });
    });
});