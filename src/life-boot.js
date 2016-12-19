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
  var boot, config, defaultAPI = {

    //// Configuration.
    config: {

      isBot      : false // useful for developing the <NOSCRIPT> bot-view
     ,defeatCache: true  // whether to append random query-string to 'src' attribs

     ,wait: {
        head:  250 // milliseconds to wait before finding <HEAD> fails
       ,body: 1000 // milliseconds to wait before finding <BODY> fails
       ,load: 2000 // milliseconds of inaction to allow before load fails
      }

      //// Specify which units to load - order does not matter.
     ,manifest: {
        cli: { is:'booting', src:'js/life-cli.js' }
      }

    }

    //// Standard methods.
   ,reset: reset
   ,init:  init
   ,main:  main

    //// For tracking units as they load.
   ,loadedSoFar: null  // a tally, updated by `register()`
   ,allLoaded:   false // becomes `true` when all units are loaded

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
    config = boot.config

    //// Register any units which have already loaded. For example, if a unit
    //// was defined in 'src/life-aardvark.js', it would be concatenated before
    //// LIFE.boot in ‘life.js’ and ‘life.min.js’. @todo discuss developer units
    for (var name in config.manifest) {
      if (LIFE[name] && 'booting' === LIFE[name].is) boot.register(name)
    }

    //// Load units which have not already been loaded.
    var waitTimer
    if (! (config.isBot) ) {
      waitTimer = ROOT.setTimeout(giveUp, config.wait.load)
      // loadUnits()
    }

  }


  //// `init()` is called by LIFE.boot.
  function init () {} //@todo announce.inited()


  //// `main()` is @todo describe.
  function main () {} //@todo announce.ready()




  //// STANDARD PRIVATE METHODS

  //// `validateAPI()` checks that any predefined API has no obvious errors.
  function validateAPI (api, cg, key, val, rx) { var FN = UNIT+':validateAPI() '
    cg = api.config || {}

    //// Validate any predefined config.wait values.
    for (key in cg.wait) {
      val = cg.wait[key]
      if (val !== ~~val || 0 > val) return FAIL(FN, 'Invalid config.wait.'+key
        +' '+SAFE(val)+' should be a positive integer greater than zero', 8826)
    }

    //// Validate any predefined config.manifest values.
    rx = /^[-.a-z0-9\/]+.js$|^inline$/
    for (key in cg.manifest) {
      val = cg.manifest[key]
      if ('booting' !== val.is) return FAIL(FN, 'Invalid config.manifest.'+key
        +'.is '+SAFE(val.is)+' should be "booting"', 6478)
      if (! rx.test(val.src) ) return FAIL(FN, 'Invalid config.manifest.'+key
        +'.src '+SAFE(val.src)+' fails '+rx, 2219)
    }

    //// @todo `isBot` and `defeatCache`

    return api // signifies success
  }




  //// SPECIFIC PRIVATE METHODS

  //// Wait for units to load.
  function giveUp () { var FN = UNIT+':giveUp() '
    for (var i=0,unit,boots=[]; unit=config.manifest[i]; i++)
      if ('loaded' !== unit.status) boots.push(unit.name)
    //@todo ignore subsequent `announce.loaded()` calls, and do a `destruct()`
    if (boots.length) FAIL(FN
      + 'Waited ' + boot.wait.load + 'ms for: ' + boots.join(', '), 4041)
  }




}()
function SAFE(v,t){return t=t||typeof v,null==v||"number"==t||"boolean"==t//@CUT
?"`"+v+"`":(v+="",'"'+(17>v.length?v:v.slice(0,8)+"..."+v.slice(-5))+'"')}//@CUT
function COPY(s,f,k,v){for(k in f){v=f[k];if('object'==typeof v){if(null==//@CUT
s[k])s[k]='[object Array]'==Object.prototype.toString.call(v)?[]:{}       //@CUT
COPY(s[k],v)}else{if(null==s[k])s[k]=v}}};function FAIL(f,t,c){(ROOT.LERT //@CUT
||ROOT.alert||NOOP)(FILE+' '+(t?f+'#'+c+'\n  '+t:'#'+f));return t?c:f}    //@CUT
function NOOP(){}                                                         //@CUT

}( 'object' == typeof global ? global : this, 'object' == typeof global ? //@CUT
    global.LIFE = global.LIFE || {} : this.LIFE = this.LIFE || {} )       //@CUT
