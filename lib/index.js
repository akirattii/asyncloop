module.exports = function({ params, fn, options }, cb) {
  const self = this;
  let errors = [];
  let results = [];
  if (!options) options = {};
  const ite = function*(_cb) {
    for (let len = params.length, i = 0; i < len; i++) {
      yield fn(params[i], (err, res) => {
        errors.push(err);
        results.push(res);
        if (options.suspend === true && err)
          return cb && cb(errors, results, "suspended"); // suspend!
        ite.next();
      });
    }
    errors = emptyArr2null(errors);
    results = emptyArr2null(results);
    return cb && cb(errors, results, "finished");
  }(cb);
  ite.next();
}

function emptyArr2null(arr) {
  if (!arr || arr.length <= 0) {
    return null;
  }
  for (let len = arr.length, i = 0; i < len; i++) {
    if (arr[i]) return arr;
  }
  return null;
}