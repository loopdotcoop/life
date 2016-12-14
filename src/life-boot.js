/* -------------------------------------------------------------------------- */
/* The starter-unit, which loads and initialises the other LIFE units.        */
/* -------------------------------------------------------------------------- */
!function (ROOT, LIFE) { 'use strict'; var FILE='src/life-boot.js'        //@CUT
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
    rx = /^[-.a-z0-9\/]+.js$|^inline$/
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
function softCopy(s,f,k,v){for(k in f){v=f[k];if('object'==typeof v){if(  //@CUT
null==s[k])s[k]='[object Array]'==Object.prototype.toString.call(v)?[]:{} //@CUT
softCopy(s[k],v)}else{if(null==s[k])s[k]=v}}};function fail(u,m,n){(ROOT. //@CUT
w80a||ROOT.alert||NOP)(FILE+' '+u+'#'+(n?n+'\n  '+m:m));return (n?n:m)}   //@CUT
                                                         function NOP(){} //@CUT

}( 'object' == typeof global ? global : this, 'object' == typeof global ? //@CUT
    global.LIFE = global.LIFE || {} : this.LIFE = this.LIFE || {} )       //@CUT
