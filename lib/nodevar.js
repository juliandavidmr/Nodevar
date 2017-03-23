function Nodevar(params) {

  var data = undefined;
  var archive = [];
  var onChange = undefined;
  var onGet = undefined;
  var protect = false;

  if (typeof params === 'object') {
    if ('onChange' in params) { // function onChange
      if (typeof params.onChange === 'function') {
        this.onChange = params.onChange;
        delete params.onChange;
      }
    }
    if ('onGet' in params) { // function onGet
      if (typeof params.onGet === 'function') {
        this.onGet = params.onGet;
        delete params.onGet;
      }
    }
    if ('data' in params) { // Default data
      addTrace(params['data']);
    }

    this.data = params['data'] ? params['data'] : params;
    //addTrace(this.data);
  } else {
    this.data = params;
  }

  Object.defineProperty(this, 'data', {
    configurable: true,
    enumerable: false,
    get: function () {
      if (archive.length !== 0) {
        var last = archive[archive.length - 1].val;
        if (typeof this.onGet === 'function') {
          var result = this.onGet(last);
          return result ? result : last;
        }
      }
    },
    set: function (value) {
      if (typeof this.onChange === 'function') {
        if (archive[archive.length - 1] !== undefined && value) {
          this.onChange.call(this, archive[archive.length - 1].val, value);
        }
      }
      //data = value;
      addTrace(value);
    }
  });

  function addTrace(values) {
    archive.push({
      val: values,
      date: new Date()
    })
  }

  this.getTrace = function () {
    return archive;
  };

  this.clear = function () {
    archive = [];
    return archive;
  };

  this.watch = function (prop, handler) {
    var oldval = this[prop];
    var newval = oldval;
    getter = function () {
      return newval;
    }
    setter = function (val) {
      oldval = newval;
      return newval = handler.call(this, oldval, val);
    }
    if (delete this[prop]) { // can't watch constants
      if (Object.defineProperty) // ECMAScript 5
        Object.defineProperty(this, prop, {
          get: getter,
          set: setter
        });
      else if (Object.prototype.__defineGetter__ && Object.prototype.__defineSetter__) { // legacy
        Object.prototype.__defineGetter__.call(this, prop, getter);
        Object.prototype.__defineSetter__.call(this, prop, setter);
      }
    }
  }
}

module.exports = Nodevar;