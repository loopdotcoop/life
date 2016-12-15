/* -------------------------------------------------------------------------- */
/* Xx. */
/* -------------------------------------------------------------------------- */

const FILE = 'tests/life-boot.test.js'
    , UNIT = 'boot'
    , a = require('assert')
    , purgeCache = require('./test-utilities.js').purgeCache
;

module.exports = config => {

  //// The first few tests are for the unit’s properties.
  const tests = [




    //// SINGLE SCRIPTS

    //// LIFE.boot existance before/after being `require()`d and after deletion.
    () => {
      delete global.LIFE; global.msg = null; purgeCache('../src/life-boot.js')

      a.strictEqual(typeof global.LIFE, 'undefined',
        "global.LIFE should not exist before `require('../src/life-boot.js')`")

      global.LIFE = { config: { isBot: true } } // don’t load other units

      require('../src/life-boot.js')
      a.strictEqual(typeof global.LIFE.boot,
        'object',
        "boot should be an object after `require('../src/life-boot.js')`")

      delete global.LIFE.boot
      a.strictEqual(typeof global.LIFE.boot,
        'undefined',
        "boot should be an undefined after `delete global.LIFE.boot`")
    },

    //// LIFE.boot.wait
    () => {
      delete global.LIFE; global.msg = null; purgeCache('../src/life-boot.js')
      global.LIFE = { config: { isBot: true } } // don’t load other units

      require('../src/life-boot.js')
      a.deepEqual(global.LIFE.boot.wait,
        { head: 250, body: 1000, load: 2000 },
        "Default LIFE.boot.wait value as expected")

      delete global.LIFE; global.msg = null; purgeCache('../src/life-boot.js')

      global.LIFE = { boot: { wait: { body:123 } } }
      global.LIFE.config = { isBot: true } // don’t load other units
      require('../src/life-boot.js')
      a.deepEqual(global.LIFE.boot.wait,
        { head: 250, body: 123, load: 2000 },
        "LIFE.boot should prefer preexisting wait values")

      global.LIFE.boot.wait.load = 'definitely bad to change this'
      a.deepEqual(global.LIFE.boot.wait,
        { head: 250, body: 123, load: 'definitely bad to change this' },
        "It’s possible (not recommended) to change wait values on-the-fly")

      global.LIFE.boot.reset()
      a.deepEqual(global.LIFE.boot.wait,
        { head: 250, body: 123, load: 2000 },
        "After `reset()`, LIFE.boot.wait regains previous custom values")

      delete global.LIFE; global.msg = null; purgeCache('../src/life-boot.js')

      global.LIFE = { boot: { wait: { body:'123' } } }
      global.LIFE.config = { isBot: true } // don’t load other units
      require('../src/life-boot.js')
      a.strictEqual(global.msg,
        'src/life-boot.js boot:validateAPI() #8826\n  Invalid wait.body'
          +' "123" should be a positive integer greater than zero',
        'Should fail if a wait value is invalid')
/*
      delete global.LIFE; global.msg = null; purgeCache('../src/life-boot.js')

      global.LIFE = { boot: { manifest: {
        config: { is:'loading', src:'another/valid-src.here.js' }
      } } }

      require('../src/life-boot.js')
      a.strictEqual(global.msg,
        'src/life-boot.js boot:validateAPI() #6478\n'
          +'  Invalid manifest.config.is: "loading" should be "booting"',
        'Should fail if a manifest `is` value is invalid')
*/
    },

    //// LIFE.boot.manifest
    () => {
      delete global.LIFE; global.msg = null; purgeCache('../src/life-boot.js')
      global.LIFE = { config: { isBot: true } } // don’t load other units

      require('../src/life-boot.js')
      a.deepEqual(global.LIFE.boot.manifest.config,
        { is:'booting', src:'js/life-config.js' },
        "Default LIFE.boot.manifest.config value as expected")

      delete global.LIFE; global.msg = null; purgeCache('../src/life-boot.js')

      global.LIFE = { boot: { manifest: {
        config: { is:'booting', src:'inline' }
      } } }
      global.LIFE.config = { isBot: true } // don’t load other units
      require('../src/life-boot.js')
      a.deepEqual(global.LIFE.boot.manifest.config,
        { is:'booting', src:'inline' },
        "LIFE.boot should prefer preexisting manifest values")

      global.LIFE.boot.manifest.config.src = 'probably bad to change this'
      a.deepEqual(global.LIFE.boot.manifest.config,
        { is:'booting', src:'probably bad to change this' },
        "It’s possible (not recommended) to change manifest values on-the-fly")

      global.LIFE.boot.reset()
      a.deepEqual(global.LIFE.boot.manifest.config,
        { is:'booting', src:'inline' },
        "After `reset()`, LIFE.boot.manifest regains previous custom values")

      delete global.LIFE; global.msg = null; purgeCache('../src/life-boot.js')

      global.LIFE = { boot: { manifest: {
        config: { is:'booting', src:'nope, this is invalid!' }
      } } }

      require('../src/life-boot.js')
      a.strictEqual(global.msg,
        'src/life-boot.js boot:validateAPI() #2219\n'
          +'  Invalid manifest.config.src: "nope, th...alid!"'
          +' fails /^[-.a-z0-9\\/]+.js$|^inline$/',
        'Should fail if a manifest `src` value is invalid')

      delete global.LIFE; global.msg = null; purgeCache('../src/life-boot.js')

      global.LIFE = { boot: { manifest: {
        config: { is:'loading', src:'another/valid-src.here.js' }
      } } }

      require('../src/life-boot.js')
      a.strictEqual(global.msg,
        'src/life-boot.js boot:validateAPI() #6478\n'
          +'  Invalid manifest.config.is: "loading" should be "booting"',
        'Should fail if a manifest `is` value is invalid')

    },




    //// CONCATENATED

    //// LIFE.boot existance before/after being `require()`d and after deletion.
    () => {
      delete global.LIFE; global.msg = null; purgeCache('../src/life-boot.js')

      a.strictEqual(typeof global.LIFE, 'undefined',
        "global.LIFE should not exist before `require('../dist/life.js')`")

      global.LIFE = { config: { isBot: true } } // don’t load other units

      require('../dist/life.js')
      a.strictEqual(typeof global.LIFE.boot,
        'object',
        "boot should be an object after `require('../dist/life.js')`")

      delete global.LIFE.boot
      a.strictEqual(typeof global.LIFE.boot,
        'undefined',
        "boot should be an undefined after `delete global.LIFE.boot`")
    },


    //// LIFE.boot.manifest
    () => {
      delete global.LIFE; global.msg = null; purgeCache('../dist/life.js')

      global.LIFE = { config: { isBot: true } } // don’t load other units

      require('../dist/life.js')
      a.deepEqual(global.LIFE.boot.manifest.config,
        { is:'booting', src:'inline' },
        "Default LIFE.boot.manifest.config value as expected")

      delete global.LIFE; global.msg = null; purgeCache('../dist/life.js')

      global.LIFE = { boot: { manifest: {
        config: { is:'booting', src:'custom/src/here.js' }
      } } }
      global.LIFE.config = { isBot: true } // don’t load other units
      require('../dist/life.js')
      a.deepEqual(global.LIFE.boot.manifest.config,
        { is:'booting', src:'custom/src/here.js' },
        "LIFE.boot should prefer preexisting manifest values")

      global.LIFE.boot.manifest.config.src = 'probably bad to change this'
      a.deepEqual(global.LIFE.boot.manifest.config,
        { is:'booting', src:'probably bad to change this' },
        "It’s possible (not recommended) to change manifest values on-the-fly")

      global.LIFE.boot.reset()
      a.deepEqual(global.LIFE.boot.manifest.config,
        { is:'booting', src:'custom/src/here.js' },
        "After `reset()`, LIFE.boot.manifest regains previous custom values")

      delete global.LIFE; global.msg = null; purgeCache('../dist/life.js')

      global.LIFE = { boot: { manifest: {
        config: { is:'booting', src:'nope, this is invalid!' }
      } } }
      global.LIFE.config = { isBot: true } // don’t load other units
      require('../dist/life.js')
      a.strictEqual(global.msg,
        'dist/life.js boot:validateAPI() #2219\n  '
          +'Invalid manifest.config.src: "nope, th...alid!"'
          +' fails /^[-.a-z0-9\\/]+.js$|^inline$/',
        'Should fail if a manifest `src` value is invalid')

      delete global.LIFE; global.msg = null; purgeCache('../dist/life.js')

      global.LIFE = { boot: { manifest: {
        config: { is:'loading', src:'another/valid-src.here.js' }
      } } }
      global.LIFE.config = { isBot: true } // don’t load other units
      require('../dist/life.js')
      a.strictEqual(global.msg,
        'dist/life.js boot:validateAPI() #6478\n  '
          +'Invalid manifest.config.is: "loading" should be "booting"',
        'Should fail if a manifest `is` value is invalid')

    },




    //// MINIFIED

    //// LIFE.boot existance before/after being `require()`d and after deletion.
    () => {
      delete global.LIFE; global.msg = null; purgeCache('../dist/life.js')

      a.strictEqual(typeof global.LIFE, 'undefined',
        "global.LIFE should not exist before `require('../dist/life.min.js')`")

      global.LIFE = { config: { isBot: true } } // don’t load other units

      require('../dist/life.min.js')
      a.strictEqual(typeof global.LIFE.boot,
        'object',
        "boot should be an object after `require('../dist/life.min.js')`")

      delete global.LIFE.boot
      a.strictEqual(typeof global.LIFE.boot,
        'undefined',
        "boot should be an undefined after `delete global.LIFE.boot`")
    },


    //// LIFE.boot.manifest
    () => {
      delete global.LIFE; global.msg = null; purgeCache('../dist/life.min.js')

      global.LIFE = { config: { isBot: true } } // don’t load other units
      require('../dist/life.min.js')
      a.deepEqual(global.LIFE.boot.manifest.config,
        { is:'booting', src:'inline' },
        "Default LIFE.boot.manifest.config value as expected")

      delete global.LIFE; global.msg = null; purgeCache('../dist/life.min.js')

      global.LIFE = { boot: { manifest: {
        config: { is:'booting', src:'custom/src/here.js' }
      } } }
      global.LIFE.config = { isBot: true } // don’t load other units
      require('../dist/life.min.js')
      a.deepEqual(global.LIFE.boot.manifest.config,
        { is:'booting', src:'custom/src/here.js' },
        "LIFE.boot should prefer preexisting manifest values")

      global.LIFE.boot.manifest.config.src = 'probably bad to change this'
      a.deepEqual(global.LIFE.boot.manifest.config,
        { is:'booting', src:'probably bad to change this' },
        "It’s possible (not recommended) to change manifest values on-the-fly")

      global.LIFE.boot.reset()
      a.deepEqual(global.LIFE.boot.manifest.config,
        { is:'booting', src:'custom/src/here.js' },
        "After `reset()`, LIFE.boot.manifest regains previous custom values")

      delete global.LIFE; global.msg = null; purgeCache('../dist/life.min.js')

      global.LIFE = { boot: { manifest: {
        config: { is:'booting', src:'nope, this is invalid!' }
      } } }
      global.LIFE.config = { isBot: true } // don’t load other units
      require('../dist/life.min.js')
      a.strictEqual(global.msg,
        'dist/life.min.js #2219',
        'Should fail if a manifest `src` value is invalid')

      delete global.LIFE; global.msg = null; purgeCache('../dist/life.min.js')

      global.LIFE = { boot: { manifest: {
        config: { is:'loading', src:'another/valid-src.here.js' }
      } } }
      global.LIFE.config = { isBot: true } // don’t load other units
      require('../dist/life.min.js')
      a.strictEqual(global.msg,
        'dist/life.min.js #6478',
        'Should fail if a manifest `is` value is invalid')

      delete global.LIFE; global.msg = null; purgeCache('../dist/life.min.js')
    },


  ];

  ////
  tests.FILE = FILE;
  tests.UNIT = UNIT;
  return tests;

};
