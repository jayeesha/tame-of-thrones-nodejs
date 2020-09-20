const expect = require('chai').expect
const cipher = require('../caesarCipher')

describe('caesarCipher.js unit tests', () => {
    describe('check whether CDEF is correctly decrypted as ABCD with key=2', () => {
        it('should equal ABCD', () => {
            const result = cipher.decrypt('CDEF',2);
            expect(result).to.equal('ABCD');
        });
    });

    describe('check whether CDEF is correctly decrypted as YZAB with key=2', () => {
        it('should equal YZAB', () => {
            const result = cipher.decrypt('ABCD',2);
            expect(result).to.equal('YZAB');
        });
    });
});