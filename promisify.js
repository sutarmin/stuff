module.exports = promisify = (func) => {
    let that = this;
    return function() { // not arrow function because of "arguments" variable
        return new Promise((resolve, reject) => {
            const args = [...arguments,function() {
                if (arguments[0]) {
                    reject(arguments[0]);
                    return;
                }
                const args = Array.prototype.slice.call(arguments, 1);
                resolve(...args);
            }];
            func.apply(that, args);
        });
    }
}