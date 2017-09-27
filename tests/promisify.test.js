const promisify = require("../promisify");
// const {promisify} = require("util"); // to check the differences with standard library
const {assert} = require("chai");


describe("promisify", () => {
    it("returns a function", () => {
        // arrange
        const testFunc = function() {}
        // act
        const pTestFunc = promisify(testFunc);
        // assert
        assert(typeof pTestFunc === "function");
    });

    it("returns a function that returns a Promise", () => {
        // arrange
        const testFunc = function() {}
        // act
        const pTestFunc = promisify(testFunc);
        const res = pTestFunc();
        // assert
        assert(res.toString() === "[object Promise]");
    });

    it("returns a function that returns a Promise which resolves when callcack called", (done) => {
        // arrange
        const testFunc = function(cb) {
            cb();
        }
        // act
        const pTestFunc = promisify(testFunc);
        const res = pTestFunc();
        // assert        
        res.then(done).catch(done);
    });

    it("works with function argument", (done) => {
        // arrange
        const testFunc = function(arg1, cb) {
            cb(null, arg1);
        }
        // act
        const pTestFunc = promisify(testFunc);
        const res = pTestFunc("testarg");
        // assert        
        res.then((arg1) => {
            assert.equal(arg1, "testarg", "Argument is not the same");
            done();
        }).catch(done);
    });

    // this test needed for documenting the caveat
    it("doesn't work with multiple function return values", (done) => {
        // arrange
        const testFunc = function(arg1, arg2, cb) {
            cb(null, arg1, arg2);
        }
        // act
        const pTestFunc = promisify(testFunc);
        const res = pTestFunc("testarg1", "testarg2");
        // assert        
        res.then((arg1, arg2) => {
            assert.equal(arg1, "testarg1", "Argument1 is not the same");
            assert.notEqual(arg2, "testarg2", "Argument2 is not the same");
            done();
        }).catch(done);
    });

});