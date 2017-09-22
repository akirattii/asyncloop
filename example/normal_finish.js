/*
 * Usage of mildloop:
 */
const mildloop = require("../lib");


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