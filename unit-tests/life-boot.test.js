/* -------------------------------------------------------------------------- */
/* Xx. */
/* -------------------------------------------------------------------------- */

const FILE = 'tests/life-boot.test.js'
    , UNIT = 'boot'
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
        a.strictEqual(typeof global.LIFE.boot,
          'object',
          "boot should be an object after `require('" + path + "')`")
        delete global.LIFE; global.msg = null; purgeCache('../' + path)
      }
      test('src/life-boot.js')
      test('dist/life.js')
      test('dist/life.min.js')
    },


    //// Default LIFE.boot.config as expected.
    () => {
      const test = (path, src) => {
        require('../' + path)
        a.strictEqual(global.msg, null, "Should not fail")
        a.deepEqual(global.LIFE.boot.config,
{

  isBot      : false // useful for developing the <NOSCRIPT> bot-view
 ,defeatCache: true  // whether to append random query-string to 'src' attribs

 ,wait: {
    head:  250 // milliseconds to wait before finding <HEAD> fails
   ,body: 1000 // milliseconds to wait before finding <BODY> fails
   ,load: 2000 // milliseconds of inaction to allow before load fails
  }

  //// Specify which units to load - order does not matter.
 ,manifest: {
    cli: { is:'booting', src: src || 'js/life-cli.js' }
  }

}

         ,"Default LIFE.boot.config values as expected")
        delete global.LIFE; global.msg = null; purgeCache('../' + path)
      }
      test('src/life-boot.js')
      test('dist/life.js', 'inline')
      test('dist/life.min.js', 'inline')
    },


    //// Keep predefined LIFE.boot.config values, whether recognised or not.
    () => {
      const test = (path) => {
        global.LIFE = { boot: { config: {
          wait: { body:123 }
         ,foo: true // not recognised
         ,manifest: {
            cli: { is:'booting', src:'this/is/valid-src.here.js' }
         }
        } } }
        global.LIFE.boot.config.isBot = true // don’t load units
        require('../' + path)
        a.strictEqual(global.msg, null, "Should not fail")
        a.deepEqual(global.LIFE.boot.config.wait,
          { head: 250, body: 123, load: 2000 },
          "LIFE.boot should prefer preexisting wait values")
        a.deepEqual(global.LIFE.boot.config.manifest.cli,
          { is:'booting', src:'this/is/valid-src.here.js' },
          "LIFE.boot should prefer preexisting manifest values")
        a.strictEqual(global.LIFE.boot.config.foo, true,
          "LIFE.boot should preserve preexisting config, even if unrecognised")
        delete global.LIFE; global.msg = null; purgeCache('../' + path)
      }
      test('src/life-boot.js')
      test('dist/life.js')
      test('dist/life.min.js')
    },


    //// reset() to previously-defined custom values, after a direct ‘bad edit’.
    () => {
      const test = (path) => {
        global.LIFE = { boot: { config: { wait: { load:456 } } } }
        global.LIFE.boot.config.isBot = true // don’t load units
        require('../' + path)
        global.LIFE.boot.config.wait.load = 'definitely bad to edit like this'
        a.strictEqual(global.msg, null, "Should not fail")
        a.deepEqual(global.LIFE.boot.config.wait,
          { head: 250, body: 1000, load: 'definitely bad to edit like this' },
          "It’s possible (not recommended) to change wait values on-the-fly")
        global.LIFE.boot.reset()
        a.deepEqual(global.LIFE.boot.config.wait,
          { head: 250, body: 1000, load: 456 },
          "After `reset()`, boot.config.wait regains previous custom values")
        delete global.LIFE; global.msg = null; purgeCache('../' + path)
      }
      test('src/life-boot.js')
      test('dist/life.js')
      test('dist/life.min.js')
    },


    //// Failed custom LIFE.cli.config.wait.head
    () => {
      const code = 8826
      const test = (path, isMin, text) => {
        global.LIFE = { boot: { config: { wait: { head:RegExp('abc') } } } }
        require('../' + path)
        a.notStrictEqual(global.msg, null, "Should fail")
        if (isMin)
          text = '#'+code
        else
          text = 'boot:validateAPI() #' + code + '\n  Invalid config.wait.head'
            + ' "/abc/" should be a positive integer greater than zero'
        a.strictEqual(global.msg, `${path} ${text}`)
        delete global.LIFE; global.msg = null; purgeCache('../' + path)
      }
      test('src/life-boot.js')
      test('dist/life.js')
      test('dist/life.min.js', true)
    },


    //// Failed custom LIFE.cli.config.manifest.is
    () => {
      const code = 6478
      const test = (path, isMin, text) => {
        global.LIFE = { boot: { config: { manifest: {
          cli: { is:'loading', src:'this/is/valid-src.here.js' }
        } } } }
        require('../' + path)
        a.notStrictEqual(global.msg, null, "Should fail")
        if (isMin)
          text = '#'+code
        else
          text = 'boot:validateAPI() #' + code + '\n  Invalid config.manifest.'
            + 'cli.is "loading" should be "booting"'
        a.strictEqual(global.msg, `${path} ${text}`)
        delete global.LIFE; global.msg = null; purgeCache('../' + path)
      }
      test('src/life-boot.js')
      test('dist/life.js')
      test('dist/life.min.js', true)
    },


    //// Failed custom LIFE.cli.config.manifest.src
    () => {
      const code = 2219
      const test = (path, isMin, text) => {
        global.LIFE = { boot: { config: { manifest: {
          cli: { is:'booting', src:'should/not/contain spaces.js' }
        } } } }
        require('../' + path)
        a.notStrictEqual(global.msg, null, "Should fail")
        if (isMin)
          text = '#'+code
        else
          text = 'boot:validateAPI() #' + code + '\n  '
            + 'Invalid config.manifest.cli.src '
            + '"should/n...es.js" fails /^[-.a-z0-9\\/]+.js$|^inline$/'
        a.strictEqual(global.msg, `${path} ${text}`)
        delete global.LIFE; global.msg = null; purgeCache('../' + path)
      }
      test('src/life-boot.js')
      test('dist/life.js')
      test('dist/life.min.js', true)
    },


  ];

  ////
  tests.FILE = FILE;
  tests.UNIT = UNIT;
  return tests;

};
