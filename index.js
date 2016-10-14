"use strict";

var regexOptions,
    lengthOptions
    ;

regexOptions = {
  uppercase    : '.*[A-Z]',
  special      : '.*[^A-Za-z0-9]',
  digit        : '.*[0-9]',
  lowercase    : '.*[a-z]',
  upperLower   : '.*[a-zA-Z]',
  alphaNumeric : '.*[a-zA-Z0-9]'
};
lengthOptions = {
  min      : '.{n,}',
  max      : '.{0,n}',
  range    : '.{min,max}',
  exact    : '.{n}',
  no_limit : '.*'
};

function create(options) {
  var regex = '^';
  for (var key in regexOptions) {
    if (isNumber(options[key])) {
      regex += '(?=' + regexOptions[key].repeat(options[key]) + ')';
    }
  }
  if (isNumber(options.min) && isNumber(options.max)) {
    regex += lengthOptions.range.replace('min', options.ran).replace('max', options.max);
  } else if (isNumber(options.max)) {
    regex += lengthOptions.max.replace('n', options.max);
  } else if (isNumber(options.min)) {
    regex += lengthOptions.min.replace('n', options.min);
  } else if (isNumber(options.exact)) {
    regex += lengthOptions.exact.replace('n', options.exact);
  } else {
    regex += lengthOptions.no_limit
  }
  regex += '$'
  return regex;
}

function check(str, regex) {
  if (typeof regex === 'object') {
    regex = create(regex);
  }
  regex = new RegExp(regex);
  return regex.test(str);
}

function checkError(str, options) {
  var tempOption   = {}
    , optionLength = {
                       min   : options.min,
                       max   : options.max,
                       exact : options.exact
                     }
    , returnObject = {}
    , str = str || ''
    ;
  for (var key in regexOptions) {
    if (isNumber(options[key])) {
      tempOption[key]   = options[key];
      returnObject[key] = check(str, tempOption);
      delete tempOption[key];
    }
  }
  for (key in optionLength) {
    if (isNumber(optionLength[key])) {
      tempOption[key]   = optionLength[key];
      returnObject[key] = check(str, tempOption);
      delete tempOption[key]
    }
  }
  return returnObject;
}

//************************
//*** Helper Functions ***
//************************

function isNumber(object) {
  return typeof object === 'number';
}

String.prototype.repeat = function( num ) {
  return new Array( num + 1 ).join( this );
}

//************************
//*** Module Export ******
//************************

module.exports = {
  create     : create,
  check      : check,
  checkError : checkError
}
