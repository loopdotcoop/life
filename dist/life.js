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
  var api, defaultAPI = {

    //// Standard methods.
    reset: reset
   ,init:  init
   ,main:  main

    //// Specify which units to load - order does not matter.
   ,manifest: {
      config: { is:'booting', src:'js/life-config.js' }
    }

  } // defaultAPI

  //// `reset()` deletes everything from the API, and then rebuilds it.
  reset()

  //// LIFE.boot is the only unit which calls its own `init()`. This begins the
  //// process of starting the app (aka bootstrapping).
  init()




  //// STANDARD PUBLIC METHODS

  //// `reset()` deletes everything from the API, and then rebuilds it.
  function reset () {

    //// Start with a blank slate, then add members from the stashed custom API,
    //// and then add any missing members.
    api = LIFE[UNIT] = {}
    softCopy(api, predefinedAPI)
    softCopy(api, defaultAPI)

  }


  //// `init()` is called by LIFE.boot.
  function init () {} //@todo announce.inited()


  //// `main()` is @todo describe.
  function main () {} //@todo announce.ready()




  //// STANDARD PRIVATE METHODS


  //// `validateAPI()` checks that any predefined API has no obvious errors.
  function validateAPI (api, key, val, rx) {

    //// Validate any predefined manifest values.
    rx = /^[-.a-z0-9\/]+.js$/
    for (key in api.manifest) {
      val = api.manifest[key]
      if ('booting' !== val.is) return fail(UNIT, 'Invalid manifest.'+key
        +'.is: "'+val.is+'" should be "booting"', 6478)
      if (! rx.test(val.src) ) return fail(UNIT, 'Invalid manifest.'+key
        +'.src: "'+val.src+'" fails '+rx, 2219)
    }

    return api // signifies success
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
    softCopy(api, predefinedAPI)
    softCopy(api, defaultAPI)

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



function softCopy (subject, fallback, key, val) { // doesn’t overwrite
  for (key in fallback) {
    val = fallback[key]
    if ('object' == typeof val) {
      if (null == subject[key])
        subject[key] =
          '[object Array]' == Object.prototype.toString.call(val)?[]:{}
      softCopy(subject[key], val)
    } else {
      if (null == subject[key]) subject[key] = val
    }
  }
}
function fail (unit, tx, num) { // with 2 args, `tx` is treated as `num`
  (ROOT.w80a||ROOT.alert||NOP)(FILE+' '+unit+'#'+(num?num+'\n  '+tx:tx))
  return (num ? num : tx)
}
function NOP () {} // no operation

}( 'object' == typeof global ? global : this, // Node’s root, else window 
   'object' == typeof global ? // create the LIFE object if not predefined
     global.LIFE = global.LIFE || {} : this.LIFE = this.LIFE || {} )
