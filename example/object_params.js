/*
 * Usage of mildloop:
 */
const mildloop = require("../lib");


//
// -- function & its params. it's up to you:
//

// params to be passed to each executing functions:
var params = [
  { name: "akira" },
  { name: "taro" },
  { name: "hanako" },
];

// async function you want to execute repeatedly:
function asyncfn({ name }, cb) {
  setTimeout(() => {
    return cb && cb(null, name.toUpperCase());
  }, 0);
}


//
// Ok, loop it:
// sets `suspend:true`. It means async loop is suspended if any error occurred.
//

// mildloop options:
var options = {}

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
results: [ 'AKIRA', 'TARO', 'HANAKO' ]

*/