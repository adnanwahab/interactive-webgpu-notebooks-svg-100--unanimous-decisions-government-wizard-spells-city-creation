// https://observablehq.com/@bumbeishvili/fetcher@491
function _1(md){return(
md`# Fetcher`
)}

function _2(md){return(
md`# Usage

## https://beta.observablehq.com/@bumbeishvili/fetcher-usage
`
)}

function _3(md){return(
md`# Fetcher`
)}

function _4(md){return(
md`Fetcher is convenient wrapper around different libs, which are responsible for data loading and parsing`
)}

function _5(md){return(
md`## <div style="color:red"> This notebook in some cases, uses (cors-anywhere.herokuapp.com) proxy server , which is only provided so that you can easily and quickly try out CORS Anywhere

<br>
## <div style="color:red">  So you may experience loading errors , when it's used too often!
<div>

For the workaround, you can fork this notebook, replace corsbypass url , which is located bottom and import changed version ... `
)}

function _6(md){return(
md`# Implementations`
)}

function _corsBypasserUrl(){return(
"https://cors-anywhere.herokuapp.com/"
)}

function _load(getData,corsBypasserUrl){return(
function load(url,type){
  return new Promise((resolve,reject)=>{
    
    var promisedData =  getData(url,type);
    
    promisedData.then(function(result){
      resolve(result);
    })
    .catch(function(e){
      resolve(getData(corsBypasserUrl+url,type))
    });
    
  })
}
)}

function _requireFromGithub(require){return(
async function requireFromGithub(jsFileUrl,prop){
  const response = await fetch(jsFileUrl);
  const blob = await response.blob();
  return require(URL.createObjectURL(blob)).catch(() => {return window[prop]});
}
)}

function _requireScript(requireFromGithub){return(
requireFromGithub
)}

function _scrape(load){return(
function scrape(url,type){
   return new Promise((resolve,reject)=>{
      var textPromise = load(url,'text');
      textPromise.then(text=>{
          var div = document.createElement('div');
          div.innerHTML=`<div>${text}</div>`
         // div.innerHTML = text;
          if(type=="dom"||type=="object"){
            resolve(div.querySelector('div'));
          }
          resolve(div);
      })
   })
}
)}

function _getData(convert,corsBypasserUrl,loadSvg,loadGoogleSpreadsheet,loadExcellFile,d3){return(
function  getData(url,type){
   
  var convertedUrl = convert(url,type);
  
  if(type){
    convertedUrl.type=type; 
  }
  
  if(convertedUrl.isHttp){
       return getData(corsBypasserUrl+url,type);
  }
  
  if(convertedUrl.isSvg){
      return loadSvg(url,type);
  }
  if(convertedUrl.isSpreadSheet){
      return loadGoogleSpreadsheet(url,type);
  }
  
  if(convertedUrl.isExcel){
     return loadExcellFile(url,type);
  }
  
   if(convertedUrl.isJsonLike){
      return d3.json(url);
  }
   
  if(!!d3[convertedUrl.type]){
     return d3[convertedUrl.type](url);
  }
   
   if(d3[convertedUrl.extension]){
       return d3[convertedUrl.extension](url);
   }
   
  return d3.json(url)
 }
)}

function _loadSvg(svg){return(
function loadSvg(url){
  function stripXmlPreamble( str ) {
     return str .replace( /^<\?xml version='1.0'\?>/, '' ) .replace(/^\n/,'')
  }
  const textPromise =  fetch(url).then( response => response.text() );
  return new Promise((res,rej)=>{
    debugger;
    textPromise.then(text=>{
       res(  svg`${stripXmlPreamble( text )}` )
    })
  })
  
}
)}

function _loadGoogleSpreadsheet(Tabletop){return(
function loadGoogleSpreadsheet(url,isNotSimpleSheet){
  return new Promise((resolve,reject)=>{
    Tabletop.init(
       { 
        key: url,
        callback: function(data){
               resolve(data);
             },
       simpleSheet: isNotSimpleSheet?false:true })
})
}
)}

function _loadExcellFile(XLSX){return(
function loadExcellFile (url){
 return new Promise((resolve,reject)=>{
     var req = new window.XMLHttpRequest();
     req.open("GET", url, true);
     req.responseType = "arraybuffer";

     req.onload = function(e) {
        var data = new Uint8Array(req.response);
        var workbook = XLSX.read(data, {type:"array"});
        resolve(XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]))
     }
     req.send();
}) 
}
)}

function _16(md){return(
md`# Libraries`
)}

function _XLSX(require){return(
require('https://unpkg.com/xlsx@0.12.9/dist/xlsx.full.min.js')
.then(d=>{
   return window.XLSX;
})
)}

function _d3(require){return(
require("d3-fetch")
)}

function _Tabletop(require){return(
require('tabletop')
)}

function _20(md){return(
md`# Utility funcs`
)}

function _convert(endsWith,isSpreadsheet,isExcel,isJsonLike,isHttp,extension){return(
function convert (url,type){
  return  {
    endsWith:endsWith(url,type),
    url:url,
    isSpreadSheet:isSpreadsheet(url,type),
    isExcel:isExcel(url,type),
    isJsonLike:isJsonLike(url,type),
    isHttp:isHttp(url,type),
    extension:extension(url,type)
  }
}
)}

function _endsWith(){return(
function endsWith(url){
   
   var matched = url.match(/\.([a-zA-Z]*)$/g)
   if(!matched) return
   return matched[0];
}
)}

function _isSpreadsheet(){return(
function isSpreadsheet(url){
   var matched = url.match(/docs\.google\.com\/spreadsheets\//g)
   if(!matched) return false
   return !!matched[0]; 
}
)}

function _excellExtensions(){return(
['xlsx','xml','.xlsx','.xml']
)}

function _isExcel(endsWith,excellExtensions){return(
function isExcel(url,type){
  var fileExtension = endsWith(url);
  if(!fileExtension) return false;
  var files=excellExtensions;
  return files.includes(fileExtension)||files.includes(type)
}
)}

function _jsonExtensions(){return(
[".json",".topojson",".geojson"]
)}

function _isJsonLike(endsWith,jsonExtensions){return(
function isJsonLike(url){
    var fileExtension = endsWith(url);
    if(!fileExtension) return false;
    var files=jsonExtensions;
    return files.includes(fileExtension)
}
)}

function _isHttp(){return(
function isHttp(url){
   var matched = url.match(/^http:/g)
   if(!matched) return false
   return !!matched[0]; 
}
)}

function _extension(){return(
function extension(url){
   
   var matched = url.match(/([a-zA-Z]*)$/g)
   if(!matched) return
   return matched[0];
}
)}

function _30(md){return(
md`# Tests`
)}

function _urls(){return(
[
  "https://gist.githubusercontent.com/vorth/3363aceb1dad0f521bcf9fd92b0e148c/raw/cd7812b655f4516b5cefe6f6adba838cb8a6b534/vZome-lifelike-ball.svg",
  "https://docs.google.com/spreadsheets/d/1GT9RMEV___rCtJvpdcThMQ62pKMrejx1BHsMO_Mrna0/edit#gid=0",
  "https://raw.githubusercontent.com/bumbeishvili/data-house/master/geo/mosaxleoba.xml",
  "https://raw.githubusercontent.com/bumbeishvili/geojson-georgian-regions/master/geo_regions.topojson",
  "https://raw.githubusercontent.com/bumbeishvili/geojson-georgian-regions/master/geo_regions.geojson",
  "https://gist.githubusercontent.com/mbostock/4063570/raw/11847750012dfe5351ee1eb290d2a254a67051d0/flare.csv",
  "https://raw.githubusercontent.com/bumbeishvili/resume.json/master/resume.json",
  "http://www.nbg.ge/rss.php",
  
]
)}

function _32(md){return(
md`# Debug zone`
)}

function _converted(urls,convert){return(
JSON.stringify(urls.map(convert),null,' ')
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("corsBypasserUrl")).define("corsBypasserUrl", _corsBypasserUrl);
  main.variable(observer("load")).define("load", ["getData","corsBypasserUrl"], _load);
  main.variable(observer("requireFromGithub")).define("requireFromGithub", ["require"], _requireFromGithub);
  main.variable(observer("requireScript")).define("requireScript", ["requireFromGithub"], _requireScript);
  main.variable(observer("scrape")).define("scrape", ["load"], _scrape);
  main.variable(observer("getData")).define("getData", ["convert","corsBypasserUrl","loadSvg","loadGoogleSpreadsheet","loadExcellFile","d3"], _getData);
  main.variable(observer("loadSvg")).define("loadSvg", ["svg"], _loadSvg);
  main.variable(observer("loadGoogleSpreadsheet")).define("loadGoogleSpreadsheet", ["Tabletop"], _loadGoogleSpreadsheet);
  main.variable(observer("loadExcellFile")).define("loadExcellFile", ["XLSX"], _loadExcellFile);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("XLSX")).define("XLSX", ["require"], _XLSX);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("Tabletop")).define("Tabletop", ["require"], _Tabletop);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("convert")).define("convert", ["endsWith","isSpreadsheet","isExcel","isJsonLike","isHttp","extension"], _convert);
  main.variable(observer("endsWith")).define("endsWith", _endsWith);
  main.variable(observer("isSpreadsheet")).define("isSpreadsheet", _isSpreadsheet);
  main.variable(observer("excellExtensions")).define("excellExtensions", _excellExtensions);
  main.variable(observer("isExcel")).define("isExcel", ["endsWith","excellExtensions"], _isExcel);
  main.variable(observer("jsonExtensions")).define("jsonExtensions", _jsonExtensions);
  main.variable(observer("isJsonLike")).define("isJsonLike", ["endsWith","jsonExtensions"], _isJsonLike);
  main.variable(observer("isHttp")).define("isHttp", _isHttp);
  main.variable(observer("extension")).define("extension", _extension);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("urls")).define("urls", _urls);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("converted")).define("converted", ["urls","convert"], _converted);
  return main;
}
