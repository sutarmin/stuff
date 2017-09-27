# stuff [![Build Status](https://travis-ci.org/sutarmin/stuff.svg?branch=master)](https://travis-ci.org/sutarmin/stuff)

Collection of self-written stuff

1. **promisify.js** - exports my own implementation of `require("util").promisify` function from Node.js.

```node
    const fs = require("fs");
    const promisify = require("promisify");

    const readFile = promisify(fs.readFile);

    // HelloWorld.txt contains "Hello, world!"
    readFile("HelloWorld.txt", "utf8").then((data) => {
        console.log(data); // prints "Hello, world!"
    });
```
