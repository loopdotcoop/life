/* -------------------------------------------------------------------------- */
/* Configuration for all LIFE units.                                          */
/* -------------------------------------------------------------------------- */
!function (ROOT, LIFE) { 'use strict'; var FILE='src/life-config.js'      //@CUT
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
function softCopy(s,f,k,v){for(k in f){v=f[k];if('object'==typeof v){if(  //@CUT
null==s[k])s[k]='[object Array]'==Object.prototype.toString.call(v)?[]:{} //@CUT
softCopy(s[k],v)}else{if(null==s[k])s[k]=v}}};function fail(u,m,n){(ROOT. //@CUT
w80a||ROOT.alert||NOP)(FILE+' '+u+'#'+(n?n+'\n  '+m:m));return (n?n:m)}   //@CUT
                                                         function NOP(){} //@CUT

}( 'object' == typeof global ? global : this, 'object' == typeof global ? //@CUT
    global.LIFE = global.LIFE || {} : this.LIFE = this.LIFE || {} )       //@CUT
