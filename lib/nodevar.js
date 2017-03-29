function Nodevar(params) {

  var archive = [];
  var limit = 500;
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

  /**
   * Define property name default
   */
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

  /**
   * Return to a previous state
   * @return {*}
   */
  this.come_back = function () {
    return (archive.length != 0) ? archive.pop() : null;
  }

  /**
   * Add object, function... to history
   * @param {*} values 
   */
  function addTrace(values) {
    archive.push({
      val: values,
      date: new Date()
    })
  }

  /**
   * Get trace full
   */
  this.getTrace = function () {
    return archive;
  };

  /**
   * Clear history
   */
  this.clear = function () {
    archive = [];
    return archive;
  };

  /**
   * Add watch
   * @param {string} prop   property name
   * @param {function} handler   function call
   */
  this.watch = function (prop, handler) {
    var oldval = this[prop];
    var nextval = oldval;
    getter = function () {
      return nextval;
    }
    setter = function (val) {
      oldval = nextval;
      return nextval = handler.call(this, oldval, val);
    }
    if (delete this[prop]) { // can't watch constants
      if (Object.defineProperty) // ECMAScript 5
        Object.defineProperty(this, prop, {
          configurable: true,
          get: getter,
          set: setter
        });
      else if (Object.prototype.__defineGetter__ && Object.prototype.__defineSetter__) { // legacy
        Object.prototype.__defineGetter__.call(this, prop, getter);
        Object.prototype.__defineSetter__.call(this, prop, setter);
      }
    }
  }

  this.unwatch = function (unprop) {
    // object.unwatch
    if (!Object.prototype.unwatch) {
      Object.defineProperty(this, unprop, {
        enumerable: false,
        configurable: true,
        writable: false,
        value: function (prop) {
          var val = this[prop];
          delete this[prop]; // remove accessors
          this[prop] = val;
        }
      });
    }
  }
}

module.exports = Nodevar;