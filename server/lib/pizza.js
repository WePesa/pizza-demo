const ba = require('blockapps-rest');
const rest = ba.rest;
const common = ba.common;
const api = common.api;
const config = common.config;
const should = common.should;
const assert = common.assert;
const expect = common.expect;
const util = common.util;
const fsutil = common.fsutil;
const Promise = common.Promise;
const eparser = common.eparser;
const axios = require('axios');

var contractsPath;

// ========== util ==========
function getYaml(filename, verbose) {
  if (verbose) console.log('filename:', filename);
  const yaml = fsutil.yamlSafeLoadSync(filename);
  if (verbose) console.log(JSON.stringify(yaml, null, 2));
  return yaml;
}

// setup the common containers in the scope for chained calls
function setScope(scope) {
  return new Promise(function(resolve, reject) {
    rest.setScope(scope).then(function(scope) {
      // add pizzaApp specific scope items here
      scope.samples = [];
      resolve(scope);
    });
  });
}

module.exports = function(_contractsPath) {
  contractsPath = _contractsPath;

  return {
    setScope: setScope(),

  };
};
