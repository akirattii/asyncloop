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
function asyncfn(obj, cb) {
  setTimeout(() => {
    return cb && cb(null, obj.name.toUpperCase());
  }, 0);
}


//
// Ok, loop it:
//

// mildloop options:
var options = {
  condition: function(err, res) {
    // If result of async fn is "TARO", a condition to exit is matched!
    if (res == "TARO") return true;
    return false;
  }
};

// Let's use mildloop!
mildloop({ params, fn: asyncfn, options }, (errors, results, status) => {
  console.log("status:", status);
  console.log("errors:", errors);
  console.log("results:", results);
});

/*
console log:

status: condition_matched
errors: null
results: [ 'AKIRA', 'TARO' ]

*/