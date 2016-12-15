//// life@0.0.5 http://life.loop.coop/ 
!function (ROOT, LIFE) { 'use strict'; var FILE='dist/life.js'

/* -------------------------------------------------------------------------- */
/* The starter-unit, which loads and initialises the other LIFE units.        */
/* -------------------------------------------------------------------------- */
!function () { var UNIT='boot'


  //// Stash any predefined API which may exist. A developer can partially or
  //// completely customise this unit by predefining LIFE.boot. We need to keep
  //// a reference to the predefined API for `reset()` to use.
  var predefinedAPI = validateAPI(LIFE[UNIT] || {})
  if (~~predefinedAPI) return // signifies that the predefined API is invalid

  //// Declare the API, and define its defaults.
  var boot, defaultAPI = {

    //// Configuration.
    isBot      : false // useful for developing the <NOSCRIPT> bot-view
   ,defeatCache: true  // whether to append random query-string to 'src' attribs
   ,wait: {
      head:  250 // milliseconds to wait before finding <HEAD> fails
     ,body: 1000 // milliseconds to wait before finding <BODY> fails
     ,load: 2000 // milliseconds of inaction to allow before load fails
    }

    //// Standard methods.
   ,reset: reset
   ,init:  init
   ,main:  main

    //// For tracking units as they load.
   ,loadedSoFar: null  // a tally, updated by `register()`
   ,allLoaded:   false // becomes `true` when all units are loaded

    //// Specify which units to load - order does not matter.
   ,manifest: {
      config: { is:'booting', src:'inline' }
    }

  } // defaultAPI


  //// Delete everything from the API, and then rebuild it.
  reset()

  //// LIFE.boot is the only unit which calls its own `init()`. This begins the
  //// process of starting the app (aka bootstrapping).
  init()




  //// STANDARD PUBLIC METHODS

  //// `reset()` deletes everything from the API, and then rebuilds it.
  function reset () {

    //// Start with a blank slate, then add members from the stashed custom API,
    //// and then add any missing members.
    boot = LIFE[UNIT] = {}
    COPY(boot, predefinedAPI)
    COPY(boot, defaultAPI)

    //// Register any units which have already loaded. For example, LIFE.aframe
    //// is concatenated before LIFE.boot in ‘life.js’ and ‘life.min.js’.
    for (var name in boot.manifest) {
      if (LIFE[name] && 'booting' === LIFE[name].is) boot.register(name)
    }

    //// Load units which have not already been loaded.
    var waitTimer
    if (! (LIFE.config && LIFE.config.isBot) ) {
      waitTimer = ROOT.setTimeout(giveUp, boot.wait.load)
      // loadUnits()
    }

  }


  //// `init()` is called by LIFE.boot.
  function init () {} //@todo announce.inited()


  //// `main()` is @todo describe.
  function main () {} //@todo announce.ready()




  //// STANDARD PRIVATE METHODS


  //// `validateAPI()` checks that any predefined API has no obvious errors.
  function validateAPI (api, key, val, rx) { var FN = UNIT+':validateAPI() '

    //// Validate any configuration values (`isBot` and `defeatCache` can be
    //// pretty much anything, we just care if they’re truthy or falsey).
    for (key in api.wait) {
      val = api.wait[key]
      if (val !== ~~val && 0 < val) return FAIL(FN, 'Invalid wait.'+key
        +' '+SAFE(val)+' should be a positive integer greater than zero', 8826)
    }

    //// Validate any predefined manifest values.
    rx = /^[-.a-z0-9\/]+.js$|^inline$/
    for (key in api.manifest) {
      val = api.manifest[key]
      if ('booting' !== val.is) return FAIL(FN, 'Invalid manifest.'+key
        +'.is: '+SAFE(val.is)+' should be "booting"', 6478)
      if (! rx.test(val.src) ) return FAIL(FN, 'Invalid manifest.'+key
        +'.src: '+SAFE(val.src)+' fails '+rx, 2219)
    }

    return api // signifies success
  }




  //// SPECIFIC PRIVATE METHODS

  //// Wait for units to load.
  function giveUp () { var FN = UNIT+':giveUp() '
    for (var i=0,unit,boots=[]; unit=boot.manifest[i]; i++)
      if ('loaded' !== unit.status) boots.push(unit.name)
    //@todo ignore subsequent `announce.loaded()` calls, and do a `destruct()`
    if (boots.length) FAIL(FN
      + 'Waited ' + boot.wait.load + 'ms for: ' + boots.join(', '), 4041)
  }




}()



/* -------------------------------------------------------------------------- */
/* Configuration for all LIFE units.                                          */
/* -------------------------------------------------------------------------- */
!function () { var UNIT='config'

  //// Stash any predefined API which may exist. A developer can partially or
  //// completely customise this unit by predefining LIFE.config. We need to
  //// keep a reference to the predefined API for `reset()` to use.
  var predefinedAPI = validateAPI(LIFE[UNIT] || {})
  if (~~predefinedAPI) return // signifies that the predefined API is invalid

  //// Declare the API, and define its defaults.
  var api, defaultAPI = {

    //// Standard methods.
    reset: reset
   ,init:  init

    ////
   ,someunit: {
      somepref: 123
    }

  } // defaultAPI

  //// `reset()` deletes everything from the API, and then rebuilds it.
  reset()




  //// STANDARD PUBLIC METHODS

  //// `reset()` deletes everything from the API, and then rebuilds it.
  function reset () {

    //// Start with a blank slate, then add members from the stashed custom API,
    //// and then add any missing members.
    api = LIFE[UNIT] = {}
    COPY(api, predefinedAPI)
    COPY(api, defaultAPI)

  }


  //// `init()` is called by LIFE.boot.
  function init () {} //@todo announce.inited()


  //// `main()` is @todo describe.
  // function main () {} //@todo announce.ready()




  //// STANDARD PRIVATE METHODS


  //// `validateAPI()` is @todo describe.
  function validateAPI (api, key, val, rx) {
    //@todo validation
    return api // signifies success
  }


  //// Let LIFE.boot know that this unit has loaded, and should be initialised.
  // if (LIFE.boot) LIFE.boot.announce.loaded(NAME)

}()



//// LIFE helper functions are easy to recognise - they are all uppercase,
//// and all four characters long.
function SAFE (v,t) { // makes any kind of variable safe for logging
  t = t || typeof v
  if ( null == v || 'number' == t || 'boolean' == t ) return '`'+v+'`'
  v += '' // convert `v` to a string
  return '"'+( 17 > v.length ? v : v.slice(0,8)+'...'+v.slice(-5) )+'"'
}
function COPY (subject, fallback, key, val) { // doesn’t overwrite data
  for (key in fallback) {
    val = fallback[key]
    if ('object' == typeof val) {
      if (null == subject[key])
        subject[key] =
          '[object Array]' == Object.prototype.toString.call(val)?[]:{}
      COPY(subject[key], val)
    } else {
      if (null == subject[key]) subject[key] = val
    }
  }
}
function FAIL (fn, tx, cd) { // with 1 arg, `fn` is treated as `cd`
  (ROOT.w80a||ROOT.alert||NOOP)(FILE+' '+(tx?fn+'#'+cd+'\n  '+tx:'#'+fn))
  return (tx ? cd : fn)
}
function NOOP () {} // no operation

}( 'object' == typeof global ? global : this, // Node’s root, else window 
   'object' == typeof global ? // create the LIFE object if not predefined
     global.LIFE = global.LIFE || {} : this.LIFE = this.LIFE || {} )
