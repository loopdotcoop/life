/* -------------------------------------------------------------------------- */
/* Node.js script which concatenates and minifies the ‘src/’ files into       */
/* ‘dist/life.js’ and ‘dist/life.min.js’.                                     */
/* -------------------------------------------------------------------------- */

const fs = require('fs')
    , path = require('path')
    , uglify = require('uglify-js') // probs? Try `$ npm install -g uglify-js`
    , allNames = fs.readdirSync('src')
    , srcNames = []
    , maxs = []
    , codes = []

//// Read all source files.
allNames.forEach( allName => {
  if ( 'life-' !== allName.substr(0,5) || '.js' !== allName.slice(-3) ) return
  srcNames.push(allName)
  maxs.push( fs.readFileSync( path.resolve('src', allName) )+'' )
})

//// Check that error codes are unique.
maxs.forEach( (max, i) => {
  const fails = max.match(/\sfail\s*\(([^\)]+,\s*\d{4}\s*)\)/mg)
  if (! fails) return
  fails.forEach( (fail, j) => {
    if (! fail) return
    const codeMatch = fail.match(/,\s*(\d{4})\s*\)$/m)
    const code = +codeMatch[1]
    if (codes[code])
      throw new Error(`${srcNames[i]}:${j} and ${codes[code]} both use ${code}`)
    codes[code] = `${srcNames[i]}:${j}`
  })
})

//// Remove lines marked `//@CUT`.
maxs.forEach( (max, i) => {
  const lines = max.split('\n')
  for (var j=0, line; null != (line=lines[j]); j++)
    if (/\s*\/\/\s*@CUT\s*$/.test(line) ) lines.splice(j--, 1)
  maxs[i] = lines.join('\n')
})

//// Modify 'boot' so that it expects units to be loaded inline.
////@todo

//// Top and tail the concatenated JavaScript.
maxs.unshift(
  "!function (ROOT, LIFE) { 'use strict'; var FILE='dist/life.js'"
)
maxs.push(
  "function softCopy (subject, fallback, key, val) { // doesn’t overwrite\n"
 +"  for (key in fallback) {\n"
 +"    val = fallback[key]\n"
 +"    if ('object' == typeof val) {\n"
 +"      if (null == subject[key])\n"
 +"        subject[key] =\n"
 +"          '[object Array]' == Object.prototype.toString.call(val)?[]:{}\n"
 +"      softCopy(subject[key], val)\n"
 +"    } else {\n"
 +"      if (null == subject[key]) subject[key] = val\n"
 +"    }\n"
 +"  }\n"
 +"}\n"
 +"function fail (unit, tx, num) { // with 2 args, `tx` is treated as `num`\n"
 +"  (ROOT.w80a||ROOT.alert||NOP)(FILE+' '+unit+'#'+(num?num+'\\n  '+tx:tx))\n"
 +"  return (num ? num : tx)\n"
 +"}\n"
 +"function NOP () {} // no operation\n\n"
 +"}( 'object' == typeof global ? global : this, // Node’s root, else window \n"
 +"   'object' == typeof global ? // create the LIFE object if not predefined\n"
 +"     global.LIFE = global.LIFE || {} : this.LIFE = this.LIFE || {} )\n"
)

//// Write the concatenated JavaScript to disk.
fs.writeFileSync( path.resolve('dist', 'life.js'), maxs.join('\n\n') )
console.log(`Created dist/life.js from ${maxs.length} sources`)

//// Remove the message argument of `fail()` calls, leaving the unit and code.
maxs.forEach( (max, i) => {
  maxs[i] = max.replace(
    /\sfail\s*\([^\)]+,\s*(\d{4})\s*\)/mg
   ,(match, code) => ' fail(UNIT,' + code + ') '
  )
})

//// Change the `FILE` variable to the minified filename.
maxs.shift()
maxs.unshift(
  "!function (ROOT, LIFE) { 'use strict'; var FILE='dist/life.min.js'"
)

//// Minify the concatenated JavaScript, and write it to disk.
const min = uglify.minify( maxs.join('\n\n'), {
  fromString: true,
  outFileName: path.resolve('dist', 'life.min.js'),
  // outSourceMap: path.resolve('dist', 'life.min.map.js'),
  warnings: true,
  output: {
    max_line_len: 64 // easier on the eye - but 500 would be a safe maximum
  },
  compress: {
    dead_code: true,
    global_defs: {
      DEBUG: false
    }
  }
})

fs.writeFileSync( path.resolve('dist', 'life.min.js'), min.code )
// fs.writeFileSync( path.resolve('dist', 'life.min.map.js'), min.map )

//// Calculate and display the amount of compression.
const maxSize = fs.statSync( path.resolve('dist', 'life.js') ).size
    , minSize = fs.statSync( path.resolve('dist', 'life.min.js') ).size
    , maxK = (maxSize / 1024).toPrecision(4)
    , minK = (minSize / 1024).toPrecision(4)
    , pc = (minSize / maxSize * 100).toPrecision(4)
console.log(`Created js/life.min.js, which is ${minK} KB (${pc}% of ${maxK} KB)`)
