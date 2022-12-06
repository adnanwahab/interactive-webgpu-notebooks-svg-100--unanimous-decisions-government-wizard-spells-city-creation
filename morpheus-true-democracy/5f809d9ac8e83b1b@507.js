// https://observablehq.com/@bumbeishvili/extract-empty-hierarchy-from-flat-data@507
import define1 from "./bde1f995226f3be4@221.js";

function _1(md){return(
md`# Extract empty hierarchy from flat data`
)}

function _2(md){return(
md`Choose Empty Hierarchical CSV Files`
)}

function _inputFiles(html){return(
html`<input type="file" multiple onchange="readFile(event)" >`
)}

function _button(html,files){return(
html`<form>${Object.assign(
  html`<button type=button>Download  ${files.length} Converted files`,
  {
    onclick: event =>
      event.currentTarget.dispatchEvent(
        new CustomEvent("input", { bubbles: true })
      )
  }
)}`
)}

function _5(converted){return(
converted
)}

function _6(md){return(
md`<br/><br/><br/><br/><br/>`
)}

function _7(md){return(
md`## Configuration`
)}

function _8(md){return(
md`Stop hierarchy assembly at`
)}

function _stopAt(html){return(
html`<input value='Part' type="text" >`
)}

function _10(md){return(
md`Set root node name as`
)}

function _rootName(html){return(
html`<input value='Root' type="text" >`
)}

function _12(md){return(
md`Set root type  as`
)}

function _rootType(html){return(
html`<input value='Corp' type="text" >`
)}

function _14(md){return(
md`## Implementation`
)}

function _fileNames(inputFiles){return(
Promise.all([...inputFiles].map(d => d.name.split('.csv')[0]))
)}

function _files(inputFiles){return(
Promise.all([...inputFiles].map(d => d.text()))
)}

function _parsed(files,d3){return(
files.map(d => d3.csvParse(d))
)}

function _flatHierarchies(parsed,stopAt,d3){return(
parsed.map(d => {
  const firstItem = d[0];
  const keys = Object.keys(firstItem);
  const index = keys.indexOf(stopAt);
  const hierarchyKeys = keys.filter((d, i) => i <= index);

  const groupedData = d3.group(
    d
      .filter(d => hierarchyKeys.some(k => d[k] != ''))
      .filter(d => d[stopAt] != ''),
    ...hierarchyKeys
      .filter((d, i, arr) => i != arr.length - 1)
      .map((d, i) => d => d[hierarchyKeys[i]])
  );
  return groupedData;
})
)}

function _converted(flatHierarchies,transformFlatHierarchy,rootName,rootType,parsed){return(
flatHierarchies.map((d, i) =>
  transformFlatHierarchy({
    map: d,
    rootTitle: rootName,
    rootType: rootType,
    columns: Object.keys(parsed[i][0])
  })
)
)}

function _downloadObjectAsJson(){return(
function downloadObjectAsJson(exportObj, exportName) {
  var dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
)}

function* _21(button,converted,downloadObjectAsJson,fileNames)
{
  button; // Wait for the start button to be clicked!
  for (let i = 0; i < 10; ++i) {
    yield i;
  }
  converted.forEach((item, i) => {
    setTimeout(d => {
      downloadObjectAsJson(converted[i], fileNames[i]);
    }, i * 500);
  });
}


function _22(md){return(
md`## Explanation`
)}

function _23(md){return(
md`Many times we have flat data structure and we want to extract a hierarchical data from it. 

The challenging part is when the data is missing some values.

For example, from the data bellow, **Tbilisi** does not have an associated state (nor does **Tbilisi old**), but it  is still considered as part of the Georgia.`
)}

function _flatData(){return(
[
  { country: 'USA', state: 'Texas', name: 'Austin' },
  { country: 'USA', state: 'California', name: 'Los Angeles' },
  { country: 'Georgia', state: 'Imereti', name: 'Kutaisi' },
  { country: 'Georgia', state: 'Imereti', name: 'Kutais New' },
  { country: 'Georgia', state: '', name: 'Tbilisi' },
  { country: 'Georgia', state: '', name: 'Tbilisi Old' },
  { country: '', state: '', name: 'International' }
]
)}

function _25(md){return(
md`Let's load d3 and see how we can solve this problem`
)}

function _d3(require){return(
require('d3@v6')
)}

function _27(md){return(
md`Normally we would do this`
)}

function _map(d3,flatData){return(
d3.group(flatData,
  d=> d.country,
  d=> d.state
)
)}

function _29(md){return(
md`But if you inspect the result, you will notice that, Tbilisi is not a first child of Georgia, it is a grandchild, which is not what we want`
)}

function _30(md){return(
md`Let's fix this by defining a function, which will transform this data to desired result`
)}

function _item(){return(
[]
)}

function _transformFlatHierarchy(){return(
function transformFlatHierarchy({ map, rootTitle, rootType, columns }) {
  let obj = {
    name: rootTitle || 'root',
    type: rootType || 'root',
    _type: 'level'
  };
  let depth = 0;
  function process(item, key, map, parent, depth) {
    if (!parent.children) parent.children = [];
    if (key === '' && !(item instanceof Map)) {
      debugger;
      parent.children = parent.children.concat(item);
      return;
    } else if (key == '' && item instanceof Map) {
      debugger;
      item.forEach((d, k, m) => process(d, k, m, parent, depth + 1));

      return;
    }
    const child = {
      name: key,
      _type: 'level',
      type: columns && columns[depth]
    };
    parent.children.push(child);
    if (item instanceof Map) {
      item.forEach((item, key, map) =>
        process(item, key, map, child, depth + 1)
      );
    } else {
      child.children = item;
    }
  }
  map.forEach((item, key, map) => process(item, key, map, obj, depth));
  return obj;
}
)}

function _33(md){return(
md`This function will return hierarchical object, where empty key properties will be flattened`
)}

function _34(map){return(
map
)}

function _result(transformFlatHierarchy,map,flatData){return(
transformFlatHierarchy({ map, columns: Object.keys(flatData[0]) })
)}

function _36(md){return(
md`As in case of map, we can directly pass this object to d3 hierarchy`
)}

function _37(md){return(
md`## Case 1 - Correct result - all nodes have titles`
)}

function _39(chartCorrect){return(
chartCorrect
)}

function _40(md){return(
md`## Case 2 - Incorrect result - some nodes do not have titles`
)}

function _dataIncorrect(d3,map)
{
  const h = d3.hierarchy(map);
  h.each(d => (d.name = d.data[0] || d.data.name));
  h.name = 'root';
  return h;
}


function _43(chartIncorrect){return(
chartIncorrect
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof inputFiles")).define("viewof inputFiles", ["html"], _inputFiles);
  main.variable(observer("inputFiles")).define("inputFiles", ["Generators", "viewof inputFiles"], (G, _) => G.input(_));
  main.variable(observer("viewof button")).define("viewof button", ["html","files"], _button);
  main.variable(observer("button")).define("button", ["Generators", "viewof button"], (G, _) => G.input(_));
  main.variable(observer()).define(["converted"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("viewof stopAt")).define("viewof stopAt", ["html"], _stopAt);
  main.variable(observer("stopAt")).define("stopAt", ["Generators", "viewof stopAt"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("viewof rootName")).define("viewof rootName", ["html"], _rootName);
  main.variable(observer("rootName")).define("rootName", ["Generators", "viewof rootName"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("viewof rootType")).define("viewof rootType", ["html"], _rootType);
  main.variable(observer("rootType")).define("rootType", ["Generators", "viewof rootType"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("fileNames")).define("fileNames", ["inputFiles"], _fileNames);
  main.variable(observer("files")).define("files", ["inputFiles"], _files);
  main.variable(observer("parsed")).define("parsed", ["files","d3"], _parsed);
  main.variable(observer("flatHierarchies")).define("flatHierarchies", ["parsed","stopAt","d3"], _flatHierarchies);
  main.variable(observer("converted")).define("converted", ["flatHierarchies","transformFlatHierarchy","rootName","rootType","parsed"], _converted);
  main.variable(observer("downloadObjectAsJson")).define("downloadObjectAsJson", _downloadObjectAsJson);
  main.variable(observer()).define(["button","converted","downloadObjectAsJson","fileNames"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("flatData")).define("flatData", _flatData);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("map")).define("map", ["d3","flatData"], _map);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer()).define(["md"], _30);
  main.define("initial item", _item);
  main.variable(observer("mutable item")).define("mutable item", ["Mutable", "initial item"], (M, _) => new M(_));
  main.variable(observer("item")).define("item", ["mutable item"], _ => _.generator);
  main.variable(observer("transformFlatHierarchy")).define("transformFlatHierarchy", _transformFlatHierarchy);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer()).define(["map"], _34);
  main.variable(observer("result")).define("result", ["transformFlatHierarchy","map","flatData"], _result);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer()).define(["md"], _37);
  const child1 = runtime.module(define1).derive([{name: "result", alias: "data"}], main);
  main.import("chart", "chartCorrect", child1);
  main.variable(observer()).define(["chartCorrect"], _39);
  main.variable(observer()).define(["md"], _40);
  const child2 = runtime.module(define1).derive([{name: "dataIncorrect", alias: "data"}], main);
  main.import("chart", "chartIncorrect", child2);
  main.variable(observer("dataIncorrect")).define("dataIncorrect", ["d3","map"], _dataIncorrect);
  main.variable(observer()).define(["chartIncorrect"], _43);
  return main;
}
