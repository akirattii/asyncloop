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


# Example

```
const mildloop = require("mildloop");

//
// -- function & its params. it's up to you:
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
// Ok, loop it:
// sets `suspend:true`. It means async loop is suspended if any error occurred.
//

// mildloop options:
var options = {
  suspend: true, // suspend if any error occurred. Defaults to false.
}

// Let's use mildloop!
mildloop({ params, fn: asyncfn, options }, (errors, results, status) => {
  console.log("status:", status);
  console.log("errors:", errors);
  console.log("results:", results);
});

/*
console log:

status: finished
errors: null
results: [ 'A', 'B', 'C', 'D' ]
*/

```

`mildloop` callback function returns `(errors, results, status)`. 

- `error`: Errors (array) of each function. If all function returned no error, `errors` is `null` but not array.
- `results`: Always array object. Each element is a result of each async function.
- `status`: `"finished"` or `"suspended"`. If you set `option.suspend: true` and any error occurred, `status` is `"suspended"`.

If you need more examples, please check `example/`.

