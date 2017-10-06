module.exports = function({ params, fn, options }, cb) {
  const self = this;
  self.errors = [];
  self.results = [];

  if (!options) options = {};
  const interval = (options && options.interval) ? options.interval : 0;
  const suspend = (options && options.suspend === true) ? true : false;
  const condition = (options && options.condition) ? options.condition : null; // a function to finish loop which returns boolean

  let terminate = false;
  self.stop = function() {
    terminate = true;
  };

  const ite = function*(_cb) {
    for (let len = params.length, i = 0; i < len; i++) {
      yield callFn({
        fn,
        param: params[i],
        interval: (i === 0) ? 0 : interval, // Only when it is the first execution, calls fn immediately
      }, (err, res) => {
        self.errors.push(err);
        self.results.push(res);
        if (suspend === true && err)
          return cb && cb(emptyArr2null(self.errors), emptyArr2null(self.results), "suspended"); // suspend!
        if (terminate === true)
          return cb && cb(emptyArr2null(self.errors), emptyArr2null(self.results), "terminated"); // terminated!
        if (condition && condition(err, res) === true)
          return cb && cb(emptyArr2null(self.errors), emptyArr2null(self.results), "condition_matched"); // condition matched!
        ite.next();
      });
    }
    return cb && cb(emptyArr2null(self.errors), emptyArr2null(self.results), "finished");
  }(cb);
  ite.next();

  return self;
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