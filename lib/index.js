module.exports = function({ params, fn, options }, cb) {
  const self = this;
  let errors = [];
  let results = [];
  if (!options) options = {};
  const interval = (options && options.interval) ? options.interval : 0;
  const suspend = (options && options.suspend === true) ? true : false;
  const ite = function*(_cb) {
    for (let len = params.length, i = 0; i < len; i++) {
      yield callFn({
        fn,
        param: params[i],
        interval: (i === 0) ? 0 : interval, // Only when it is the first execution, calls fn immediately
      }, (err, res) => {
        errors.push(err);
        results.push(res);
        if (suspend === true && err)
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

function callFn({ fn, param, interval = 0 }, cb) {
  setTimeout(() => {
    fn(param, cb);
  }, interval);
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