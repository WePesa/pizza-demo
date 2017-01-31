const ba = require('blockapps-rest');
const rest = ba.rest;
const common = ba.common;
const api = common.api;
const config = common.config;
const util = common.util;
const fsutil = common.fsutil;
const should = common.should;
const assert = common.assert;
const expect = common.expect;
const BigNumber = common.BigNumber;
const Promise = common.Promise;

const pizza = require(process.cwd() +'/server/lib/pizza')(config.contractsPath);

