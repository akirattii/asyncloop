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
  }, 1000);
}


//
// Ok, loop it:
// sets `suspend:true`. It means async loop is suspended if any error occurred.
//

// mildloop options:
var options = {
  suspend: false, // suspend if any error occurred. Defaults to false.
}

// let's use mildloop!
const instance = mildloop({ params, fn: asyncfn, options }, (errors, results, status) => {
  console.log("status:", status);
  console.log("errors:", errors);
  console.log("results:", results);
});

// stop the mildloop after 2 seconds:
setTimeout(() => {
  instance.stop(); // be terminated!
}, 2000);

/*
console log:

status: terminated
errors: null
results: [ 'A', 'B' ]
*/