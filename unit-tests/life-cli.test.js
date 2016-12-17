/* -------------------------------------------------------------------------- */
/* Xx. */
/* -------------------------------------------------------------------------- */

const FILE = 'tests/life-cli.test.js'
    , UNIT = 'cli'
    , a = require('assert')
    , purgeCache = require('./test-utilities.js').purgeCache

global.msg = null

module.exports = config => {

  const tests = [


    //// LIFE should not currently exist.
    () => {
      a.strictEqual(typeof global.LIFE, 'undefined',
        "global.LIFE should not exist before `require()`")
    },


    //// LIFE.cli exists after being `require()`d.
    () => {
      const test = (path) => {
        require('../' + path)
        a.strictEqual(global.msg, null, "Should not fail")
        a.strictEqual(typeof global.LIFE.cli,
          'object',
          "cli should be an object after `require('" + path + "')`")
        delete global.LIFE; global.msg = null; purgeCache('../' + path)
      }
      test('src/life-cli.js')
      test('dist/life.js')
      test('dist/life.min.js')
    },


    //// Default LIFE.cli.config as expected.
    () => {
      const test = (path) => {
        require('../' + path)
        a.strictEqual(global.msg, null, "Should not fail")
        a.deepEqual(global.LIFE.cli.config,
          { width: 80, height: 24 },
          "Default LIFE.cli.config values as expected")
        delete global.LIFE; global.msg = null; purgeCache('../' + path)
      }
      test('src/life-cli.js')
      test('dist/life.js')
      test('dist/life.min.js', true)
    },


    //// Keep predefined LIFE.cli.config, even if not recognised.
    () => {
      const test = (path) => {
        global.LIFE = { cli: { config: {
          width:120, notknown: { will:'be kept' } } } }
        require('../' + path)
        a.strictEqual(global.msg, null, "Should not fail")
        a.deepEqual(global.LIFE.cli.config,
          { width:120, height:24, notknown: { will:'be kept' } },
          "LIFE.cli should not overwrite predefined values")
        delete global.LIFE; global.msg = null; purgeCache('../' + path)
      }
      test('src/life-cli.js')
      test('dist/life.js')
      test('dist/life.min.js')
    },


    //// Failed custom LIFE.cli.config.width
    () => {
      const code = 9102
      const test = (path, isMin, text) => {
        global.LIFE = { cli: { config: { width:'abc', height:30 } } }
        require('../' + path)
        a.notStrictEqual(global.msg, null, "Should fail")
        if (isMin)
          text = '#'+code
        else
          text = 'cli:validateAPI() #' + code + '\n  Invalid config.width'
            + ' "abc" should be a positive integer greater than zero'
        a.strictEqual(global.msg, `${path} ${text}`)
        delete global.LIFE; global.msg = null; purgeCache('../' + path)
      }
      test('src/life-cli.js')
      test('dist/life.js')
      test('dist/life.min.js', true)
    },


    //// Failed custom LIFE.cli.config.height
    () => {
      const code = 4471
      const test = (path, isMin, text) => {
        global.LIFE = { cli: { config: { width:120, height:true } } }
        require('../' + path)
        a.notStrictEqual(global.msg, null, "Should fail")
        if (isMin)
          text = '#' + code
        else
          text = 'cli:validateAPI() #' + code + '\n  Invalid config.height'
            + ' `true` should be a positive integer greater than zero'
        a.strictEqual(global.msg, `${path} ${text}`)
        delete global.LIFE; global.msg = null; purgeCache('../' + path)
      }
      test('src/life-cli.js')
      test('dist/life.js')
      test('dist/life.min.js', true)
    },


  ];


  ////
  tests.FILE = FILE;
  tests.UNIT = UNIT;
  return tests;

};
