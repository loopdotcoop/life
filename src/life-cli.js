/* -------------------------------------------------------------------------- */
/* The command line interface at the heart of all LIFE operations.            */
/* -------------------------------------------------------------------------- */
!function (ROOT, LIFE) { 'use strict'; var FILE='src/life-cli.js'         //@CUT
!function () { var UNIT='cli'

  //// Stash any predefined API which may exist. A developer can partially or
  //// completely customise this unit by predefining LIFE.cli. We need to keep
  //// a reference to the predefined API for `reset()` to use.
  var predefinedAPI = validateAPI(LIFE[UNIT] || {})
  if (~~predefinedAPI) return // signifies that the predefined API is invalid

  //// Declare the API, and define its defaults.
  var cli, config, defaultAPI = {

    //// Configuration.
    config: {

      width : 80 // number of characters per line
     ,height: 24 // number of lines per page

    }

    //// Standard methods.
   ,reset: reset
   ,init:  init
   ,main:  main

  } // defaultAPI


  //// Delete everything from the API, and then rebuild it.
  reset()

  //// Let LIFE.boot know that this unit has loaded, and should be initialised.
  // if (LIFE.boot) LIFE.boot.announce.loaded(NAME)




  //// STANDARD PUBLIC METHODS

  //// `reset()` deletes everything from the API, and then rebuilds it.
  function reset () {

    //// Start with a blank slate, then add members from the stashed custom API,
    //// and then add any missing members.
    cli = LIFE[UNIT] = {}
    COPY(cli, predefinedAPI)
    COPY(cli, defaultAPI)
    config = cli.config

  }


  //// `init()` is called by LIFE.boot.
  function init () {} //@todo announce.inited()


  //// `main()` is @todo describe.
  function main () {} //@todo announce.ready()




  //// STANDARD PRIVATE METHODS

  //// `validateAPI()` checks that any predefined API has no obvious errors.
  function validateAPI (api, cg, val) { var FN = UNIT+':validateAPI() '
    cg = api.config || {}

    //// Validate any predefined width and height.
    val = cg.width

    if (null != val)
      if (val !== ~~val || 0 > val) return FAIL(FN, 'Invalid config.width '
        +SAFE(val)+' should be a positive integer greater than zero', 9102)
    val = cg.height
    if (null != val)
      if (val !== ~~val || 0 > val) return FAIL(FN, 'Invalid config.height '
        +SAFE(val)+' should be a positive integer greater than zero', 4471)

    return api // signifies success
  }

}()
function SAFE(v,t){return t=t||typeof v,null==v||"number"==t||"boolean"==t//@CUT
?"`"+v+"`":(v+="",'"'+(17>v.length?v:v.slice(0,8)+"..."+v.slice(-5))+'"')}//@CUT
function COPY(s,f,k,v){for(k in f){v=f[k];if('object'==typeof v){if(null==//@CUT
s[k])s[k]='[object Array]'==Object.prototype.toString.call(v)?[]:{}       //@CUT
COPY(s[k],v)}else{if(null==s[k])s[k]=v}}};function FAIL(f,t,c){(ROOT.w80a //@CUT
||ROOT.alert||NOOP)(FILE+' '+(t?f+'#'+c+'\n  '+t:'#'+f));return t?c:f}    //@CUT
function NOOP(){}                                                         //@CUT

}( 'object' == typeof global ? global : this, 'object' == typeof global ? //@CUT
    global.LIFE = global.LIFE || {} : this.LIFE = this.LIFE || {} )       //@CUT
