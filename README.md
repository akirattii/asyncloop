# mildloop

A simple helper library for async function's loop execution. 
It allows you to execute your async function logic repeatedly, passing any parameter to every executions of a function.

# Install

```
npm install --save mildloop
```

# Basic Usage

```
const mildloop = require("mildloop");

// mildloop options:
var options = {
  suspend: true, // suspend if any error occurred. Defaults to false.
}

var params = [...]; // Array of param which is pass to each function

// Let's use mildloop!
mildloop({ params, fn: asyncfn, options }, (errors, results, status) => {
  console.log("status:", status);
  console.log("errors:", errors);
  console.log("results:", results);
});
```

# Options

| Option | Type | Detail | Default |
|:-----------|:------------|:------------|:------------|
| `suspend` | Boolean | If set true, when any error occurred in the middle of loop, breaks execution loop. | `false` |
| `interval` | Number | Milliseconds of execution interval. Only the first function is executed immediately without any interval. | `0` |
| `condition` | Function | A function which returns boolean is used as a condition to exit loop. | `null` |


# Example

```
const mildloop = require("mildloop");

//
// prepare async function & thier param. it's up to you:
//

// params to be passed to each executing functions:
var params = ["a", "b", "c", "d"];

// async function you want to execute repeatedly:
function asyncfn(s, cb) {
  setTimeout(() => {
    if (typeof s == "string")
      return cb && cb(null, s.toUpperCase());
    else
      return cb && cb(Error(s + " must be a string"));
  }, 0);
}


//
// Ok, loop them:
// sets `suspend:true`. It means async loop is suspended if any error occurred.
//

// mildloop options:
var options = {
  suspend: true, // suspend if any error occurred. Defaults to false.
}

// Let's use mildloop!
const instance = mildloop({ params, fn: asyncfn, options }, (errors, results, status) => {
  console.log("status:", status);
  console.log("errors:", errors);
  console.log("results:", results);
});

// If you want to stop the loop, you can stop it by yourself in the middle:
// instance.stop(); // returned `status` on the callback will be set as "terminated"

/*
console log:

status: finished
errors: null
results: [ 'A', 'B', 'C', 'D' ]
*/

```

`mildloop` callback function returns `(errors, results, status)`. 

- **error**: Errors (array) of each function. If all function returned no error, `errors` is `null` but not array.
- **results**: Always array object. Each element is a result of each async function.
- **status**: `"finished"`, `"suspended"`, `"terminated"`, or `"condition_matched"`.
    - If you set `option.suspend: true` and any error occurred, `status` is `"suspended"`.
    - If you `stop()` the loop by yourself, `"terminated"` is set.
    - If you set `condition` option and it is matched, the execution loop is suspended and `"condition_matched"` is set. 





If you need more examples, please check `example/`.

