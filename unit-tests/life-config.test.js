/* -------------------------------------------------------------------------- */
/* Xx. */
/* -------------------------------------------------------------------------- */

const FILE = 'tests/life-config.test.js'
    , UNIT = 'config'
    , a = require('assert')
    , purgeCache = require('./test-utilities.js').purgeCache
;

module.exports = config => {

  //// The first few tests are for the unit’s properties.
  const tests = [




    //// SINGLE SCRIPTS

    //// LIFE.config existance before/after being `require()`d and after deletion.
    () => {
      delete global.LIFE; global.msg = null; purgeCache('../src/life-config.js')

      a.strictEqual(typeof global.LIFE, 'undefined',
        "global.LIFE should not exist before `require('../src/life-config.js')`")

      require('../src/life-config.js')
      a.strictEqual(typeof global.LIFE.config,
        'object',
        "config should be an object after `require('../src/life-config.js')`")

      delete global.LIFE.config
      a.strictEqual(typeof global.LIFE.config,
        'undefined',
        "config should be an undefined after `delete global.LIFE.config`")

    },


    //// LIFE.config
    () => {
      delete global.LIFE; global.msg = null; purgeCache('../src/life-config.js')

      require('../src/life-config.js')
      a.deepEqual(global.LIFE.config.someunit,
        { somepref: 123 },
        "Default LIFE.config.someunit values as expected")

      delete global.LIFE; global.msg = null; purgeCache('../src/life-config.js')

      global.LIFE = { config: {
        someunit: { somepref:456, notknown: { will:'be kept' } }
      } }
      require('../src/life-config.js')
      a.deepEqual(global.LIFE.config.someunit,
        { somepref:456, notknown: { will:'be kept' } },
        "LIFE.config.someunit should not overwrite predefined values")

    },




    //// CONCATENATED

    //// LIFE.config existance before/after being `require()`d and after deletion.
    () => {
      delete global.LIFE; global.msg = null; purgeCache('../src/life-config.js')

      a.strictEqual(typeof global.LIFE, 'undefined',
        "global.LIFE should not exist before `require('../dist/life.js')`")

      require('../dist/life.js')
      a.strictEqual(typeof global.LIFE.config,
        'object',
        "config should be an object after `require('../dist/life.js')`")

      delete global.LIFE.config
      a.strictEqual(typeof global.LIFE.config,
        'undefined',
        "config should be an undefined after `delete global.LIFE.config`")

    },


    //// LIFE.config
    () => {
      delete global.LIFE; global.msg = null; purgeCache('../dist/life.js')

      require('../dist/life.js')
      a.deepEqual(global.LIFE.config.someunit,
        { somepref: 123 },
        "Default LIFE.config.someunit values as expected")

      delete global.LIFE; global.msg = null; purgeCache('../dist/life.js')

      global.LIFE = { config: {
        someunit: { somepref:456, notknown: { will:'be kept' } }
      } }
      require('../dist/life.js')
      a.deepEqual(global.LIFE.config.someunit,
        { somepref:456, notknown: { will:'be kept' } },
        "LIFE.config.someunit should not overwrite predefined values")

    },




    //// MINIFIED

    //// LIFE.config existance before/after being `require()`d and after deletion.
    () => {
      delete global.LIFE; global.msg = null; purgeCache('../dist/life.js')

      a.strictEqual(typeof global.LIFE, 'undefined',
        "global.LIFE should not exist before `require('../dist/life.min.js')`")

      require('../dist/life.min.js')
      a.strictEqual(typeof global.LIFE.config,
        'object',
        "config should be an object after `require('../dist/life.min.js')`")

      delete global.LIFE.config
      a.strictEqual(typeof global.LIFE.config,
        'undefined',
        "config should be an undefined after `delete global.LIFE.config`")

    },


    //// LIFE.config
    () => {
      delete global.LIFE; global.msg = null; purgeCache('../dist/life.min.js')

      require('../dist/life.min.js')
      a.deepEqual(global.LIFE.config.someunit,
        { somepref: 123 },
        "Default LIFE.config.someunit values as expected")

      delete global.LIFE; global.msg = null; purgeCache('../dist/life.min.js')

      global.LIFE = { config: {
        someunit: { somepref:456, notknown: { will:'be kept' } }
      } }
      require('../dist/life.min.js')
      a.deepEqual(global.LIFE.config.someunit,
        { somepref:456, notknown: { will:'be kept' } },
        "LIFE.config.someunit should not overwrite predefined values")

      delete global.LIFE; global.msg = null; purgeCache('../dist/life.min.js')
    },


  ];

  ////
  tests.FILE = FILE;
  tests.UNIT = UNIT;
  return tests;

};
