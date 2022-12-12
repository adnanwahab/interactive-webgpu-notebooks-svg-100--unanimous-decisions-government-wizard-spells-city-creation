// https://observablehq.com/@zechasault/color-schemes-and-interpolators-picker@1461
function _1(md){return(
md`# Color Schemes And Interpolators Picker

`
)}

function _2(md){return(
md`### Schemes
~~~js
import {colorSchemePicker} from "@zechasault/color-schemes-and-interpolators-picker"
~~~

colorSchemePicker can be built in 3 maners:
  - By simply passing the name of a d3 categorical scheme (cf [Categorical schemes](https://github.com/d3/d3-scale-chromatic#categorical))
  - By passing the name of the d3 discrete scheme and a size k ranging (cf [Diverging schemes](https://github.com/d3/d3-scale-chromatic#diverging))
  - By passing the name of scheme and an array of color (cf custom schemes)

The picker value are an array of colors 
`
)}

function _3(categoricalScheme){return(
categoricalScheme
)}

function _4(md){return(
md`---

### Here a collection of reusable schemes picker:`
)}

function _categoricalScheme(colorSchemePicker){return(
colorSchemePicker({
  title: "Categorical schemes",
  height: 500,
  schemes: [
    {
      name: "Category10"
    },
    {
      name: "Accent"
    },
    {
      name: "Dark2"
    },
    {
      name: "Paired"
    },
    {
      name: "Pastel1"
    },
    {
      name: "Pastel2"
    },
    {
      name: "Set1"
    },
    {
      name: "Set2"
    },
    {
      name: "Set3"
    }
  ]
})
)}

function _6(md){return(
md`~~~js
import {viewof categoricalScheme} from "@zechasault/color-schemes-and-interpolators-picker"
~~~`
)}

function _k(html,d3){return(
html`<select>
 ${d3.range(11, 2, -1).map(
   n => `
  <option value=${n}>discrete (${n})</option>`
 )}
</select>`
)}

function _divergingScheme(colorSchemePicker,k){return(
colorSchemePicker({
  title: "Diverging schemes",
  height: 500,

  schemes: [
    {
      name: "BrBG",
      k
    },
    {
      name: "PRGn",
      k
    },
    {
      name: "PiYG",
      k
    },
    {
      name: "PuOr",
      k
    },
    {
      name: "RdBu",
      k
    },
    {
      name: "RdGy",
      k
    },
    {
      name: "RdYlBu",
      k
    },
    {
      name: "RdYlGn",
      k
    },
    {
      name: "Spectral",
      k
    }
  ]
})
)}

function _9(md){return(
md`~~~js
import {viewof divergingScheme} from "@zechasault/color-schemes-and-interpolators-picker"
~~~`
)}

function _sequentialSingleHueScheme(colorSchemePicker,k){return(
colorSchemePicker({
  title: "Sequential (Single Hue)",
  height: 500,

  schemes: [
    {
      name: "Blues",
      k
    },
    {
      name: "Greens",
      k
    },
    {
      name: "Greys",
      k
    },
    {
      name: "Oranges",
      k
    },
    {
      name: "Purples",
      k
    },
    {
      name: "Reds",
      k
    }
  ]
})
)}

function _11(md){return(
md`~~~js
import {viewof sequentialSingleHueScheme} from "@zechasault/color-schemes-and-interpolators-picker"
~~~`
)}

function _sequentialMultiHueScheme(colorSchemePicker,k){return(
colorSchemePicker({
  title: "Sequential (Multi Hue)",
  height: 500,

  schemes: [
    {
      name: "BuGn",
      k
    },
    {
      name: "BuPu",
      k
    },
    {
      name: "GnBu",
      k
    },
    {
      name: "OrRd",
      k
    },
    {
      name: "PuBuGn",
      k
    },
    {
      name: "PuBu",
      k
    },
    {
      name: "PuRd",
      k
    },
    {
      name: "RdPu",
      k
    },
    {
      name: "YlGnBu",
      k
    },
    {
      name: "YlGn",
      k
    },
    {
      name: "YlOrBr",
      k
    },
    {
      name: "YlOrRd",
      k
    }
  ]
})
)}

function _13(md){return(
md`~~~js
import {viewof sequentialMultiHueScheme} from "@zechasault/color-schemes-and-interpolators-picker"
~~~`
)}

function _14(md){return(
md` ### Here a little exemple to create a custom scheme picker:`
)}

function _customScheme(colorSchemePicker,d3){return(
colorSchemePicker({
  title: "Custom scheme",
  height: 500,
  description: "This is a collection of custom schemes",
  w: 700,
  value: "Custom2",
  schemes: [
    {
      name: "Custom",
      colors: ["black", "red", "black", "red", "black", "red", "black"]
    },
    {
      name: "Custom2",
      colors: [...d3.schemeCategory10, ...d3.schemeSet1]
    },
    {
      name: "Accent"
    },
    {
      name: "BuGn",
      k: 5
    }
  ]
})
)}

function _colorSchemePicker(html,width,styles,d3,getColorViewer){return(
function colorSchemePicker(config = {}) {
  let { value, title, description, height, w, schemes } = config;

  const form = html`<form>
  </form>`;

  const dropdown = html`
  <div class="dropdownsi" style="width:${w ? w : Math.min(width, 500)}px">
    ${styles()}
    <span style="font: 700 0.9rem sans-serif;">${title ? title : ""}</span>    

  </div>
`;
  value = value ? schemes.find(d => d.name === value) : schemes[0];
  form.value = value.colors
    ? value.colors
    : value.k
    ? d3[`scheme${value.name}`][value.k]
    : d3[`scheme${value.name}`];

  let valueCont = html`<div class="colorViewer"></div>`;
  let valueViewer = getColorViewer(value, form);
  valueCont.append(valueViewer);
  dropdown.append(valueCont);

  const dropdownContainer = html`<div class="dropdownsi-content" 
      style="max-height:${height ? height : 200}px; 
             width:${w ? w : Math.min(width, 500)}px;">
 
      ${schemes.map(scheme => {
        let colorViewer = getColorViewer(scheme, form);
        colorViewer.onclick = () => {
          valueCont.removeChild(valueCont.firstChild);
          valueViewer = getColorViewer(scheme, form);
          valueCont.append(valueViewer);
          form.value = valueViewer.value;
          form.dispatchEvent(new CustomEvent("input", { bubbles: true }));
        };
        return html`<div class="colorViewer"> ${colorViewer} <div>`;
      })}
      
    </div>`;

  dropdown.append(dropdownContainer);
  form.append(dropdown);
  if (description)
    form.append(
      html`<div style="font-size: 0.85rem; font-style: italic;">${description}</div>`
    );

  return form;
}
)}

function _17(md){return(
md` ---

### Interpolator
~~~js
import {colorInterpolatorPicker} from "@zechasault/color-schemes-and-interpolators-picker"
~~~
colorInterpolatorPicker can be built to 2 maners:
  - By simply passing the name of a d3 continuous interpolators (cf [continuous interpolators](https://github.com/d3/d3-scale-chromatic#diverging))
  - By passing the name and a interpolate function as value (cf Custom interpolator)

The picker value are an interpolators function`
)}

function _18(divergingInterpolator){return(
divergingInterpolator
)}

function _divergingInterpolator(colorInterpolatorPicker){return(
colorInterpolatorPicker({
  title: "Color interpolator",
  height: 500,
  interpolators: [
    {
      name: "BrBG"
    },
    {
      name: "PRGn"
    },
    {
      name: "PiYG"
    },
    {
      name: "PuOr"
    },
    {
      name: "RdBu"
    },
    {
      name: "RdGy"
    },
    {
      name: "RdYlBu"
    },
    {
      name: "RdYlGn"
    },
    {
      name: "Spectral"
    }
  ]
})
)}

function _20(md){return(
md`~~~js
import {viewof divergingInterpolator} from "@zechasault/color-schemes-and-interpolators-picker"
~~~`
)}

function _sequentialSingleHueInterpolator(colorInterpolatorPicker){return(
colorInterpolatorPicker({
  title: "Sequential (Single Hue)",
  height: 500,

  interpolators: [
    {
      name: "Blues"
    },
    {
      name: "Greens"
    },
    {
      name: "Greys"
    },
    {
      name: "Oranges"
    },
    {
      name: "Purples"
    },
    {
      name: "Reds"
    }
  ]
})
)}

function _22(md){return(
md`~~~js
import {viewof sequentialSingleHueInterpolator} from "@zechasault/color-schemes-and-interpolators-picker"
~~~`
)}

function _sequentialMultiHueInterpolator(colorInterpolatorPicker){return(
colorInterpolatorPicker({
  title: "Sequential (Multi Hue)",
  height: 500,
  interpolators: [
    { name: "Turbo" },
    {
      name: "Viridis"
    },
    {
      name: "Inferno"
    },
    {
      name: "Magma"
    },
    {
      name: "Plasma"
    },
    {
      name: "Cool"
    },
    {
      name: "CubehelixDefault"
    },
    {
      name: "BuGn"
    },
    {
      name: "BuPu"
    },
    {
      name: "GnBu"
    },
    {
      name: "OrRd"
    },
    {
      name: "PuBuGn"
    },
    {
      name: "PuBu"
    },
    {
      name: "PuRd"
    },
    {
      name: "RdPu"
    },
    {
      name: "YlGnBu"
    },
    {
      name: "YlGn"
    },
    {
      name: "YlOrBr"
    },
    {
      name: "YlOrRd"
    }
  ]
})
)}

function _24(md){return(
md`~~~js
import {viewof sequentialMultiHueInterpolator} from "@zechasault/color-schemes-and-interpolators-picker"
~~~`
)}

function _cyclicalInterpolator(colorInterpolatorPicker){return(
colorInterpolatorPicker({
  title: "Cyclical",
  height: 500,
  interpolators: [
    {
      name: "Rainbow"
    },
    {
      name: "Sinebow"
    }
  ]
})
)}

function _26(md){return(
md`~~~js
import {viewof cyclicalInterpolator} from "@zechasault/color-schemes-and-interpolators-picker"
~~~`
)}

function _allD3Interpolator(colorInterpolatorPicker){return(
colorInterpolatorPicker({
  title: "All D3 Interpolator",
  height: 300,
  interpolators: [
    {
      name: "BrBG"
    },
    {
      name: "PRGn"
    },
    {
      name: "PiYG"
    },
    {
      name: "PuOr"
    },
    {
      name: "RdBu"
    },
    {
      name: "RdGy"
    },
    {
      name: "RdYlBu"
    },
    {
      name: "RdYlGn"
    },
    {
      name: "Spectral"
    },
    {
      name: "Blues"
    },
    {
      name: "Greens"
    },
    {
      name: "Greys"
    },
    {
      name: "Oranges"
    },
    {
      name: "Purples"
    },
    {
      name: "Reds"
    },
    {
      name: "Viridis"
    },
    {
      name: "Inferno"
    },
    {
      name: "Magma"
    },
    {
      name: "Plasma"
    },
    {
      name: "Cool"
    },
    {
      name: "CubehelixDefault"
    },
    {
      name: "BuGn"
    },
    {
      name: "BuPu"
    },
    {
      name: "GnBu"
    },
    {
      name: "OrRd"
    },
    {
      name: "PuBuGn"
    },
    {
      name: "PuBu"
    },
    {
      name: "PuRd"
    },
    {
      name: "RdPu"
    },
    {
      name: "YlGnBu"
    },
    {
      name: "YlGn"
    },
    {
      name: "YlOrBr"
    },
    {
      name: "YlOrRd"
    },
    {
      name: "Rainbow"
    },
    {
      name: "Sinebow"
    },
    {
      name: "Turbo"
    }
  ]
})
)}

function _28(md){return(
md`~~~js
import {viewof allD3Interpolator} from "@zechasault/color-schemes-and-interpolators-picker"
~~~`
)}

function _29(md){return(
md` ### Here a little exemple to create a custom Interpolator picker:

usage exemple [here](https://observablehq.com/@zechasault/hexagons)`
)}

function _customInterpolator(colorInterpolatorPicker,d3,customScheme){return(
colorInterpolatorPicker({
  title: "Custom interpolator",
  height: 500,
  value: "Custom",
  description: "This is a collection of custom interpolators",
  interpolators: [
    {
      name: "BrBG"
    },
    {
      name: "Custom",
      value: d3.interpolateRgbBasis(customScheme)
    },
    {
      name: "Custom 2",
      value: d3.interpolateLab("red", "black")
    },
    {
      name: "Custom 3",
      value: d3.interpolateLab("steelblue", "brown")
    },
    {
      name: "Custom 4",
      value: d3.interpolateRgbBasis(["black", "white", "green"])
    }
  ]
})
)}

function _colorInterpolatorPicker(html,d3,width,styles,getColorViewer){return(
function colorInterpolatorPicker(config = {}) {
  let { value, title, description, height, w, interpolators } = config;

  value = value ? interpolators.find(d => d.name === value) : interpolators[0];

  const form = html`<form >
  </form>`;

  form.value = value.value ? value.value : d3[`interpolate${value.name}`];

  const dropdown = html`
  <div class="dropdownsi" style="width:${w ? w : Math.min(width, 500)}px">
    ${styles()}
    <span style="font: 700 0.9rem sans-serif;">${title ? title : ""}</span>  
  </div>
`;

  let valueCont = html`<div class="colorViewer"></div>`;
  let valueViewer = getColorViewer(value, form, true);
  valueCont.append(valueViewer);
  dropdown.append(valueCont);

  const dropdownContainer = html`<div class="dropdownsi-content" 
      style="max-height:${height ? height : 200}px; 
             width:${w ? w : Math.min(width, 500)}px;">
 
      ${interpolators.map(interpolator => {
        let colorViewer = getColorViewer(interpolator, form, true);
        colorViewer.onclick = () => {
          valueCont.removeChild(valueCont.firstChild);
          valueViewer = getColorViewer(interpolator, form, true);
          valueCont.append(valueViewer);
          form.value = valueViewer.value;
          form.dispatchEvent(new CustomEvent("input", { bubbles: true }));
        };
        return html`<div class="colorViewer"> ${colorViewer} <div>`;
      })}
      
    </div>`;

  dropdown.append(dropdownContainer);
  form.append(dropdown);
  if (description)
    form.append(
      html`<div style="font-size: 0.85rem; font-style: italic;">${description}</div>`
    );

  return form;
}
)}

function _32(md){return(
md`---

## Issues
- Expanded cells hide color viewer

you can send me a suggestion if you know how to fix it
`
)}

function _33(md){return(
md` ---

### Style`
)}

function _styles(html){return(
() => html`
<style>
.dropdownsi {
  position: relative;
  display: inline-block;

}

.dropdownsi-content {
  word-break:break-all;
  overflow-y:auto; 
  width:100%;
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.colorViewer{
  position: relative;
  margin-top:2px;
  margin-left:14px;
  margin-right:14px;
  cursor:pointer;
}

.colorViewer:hover{
  opacity:0.8;
}

.dropdownsi:hover .dropdownsi-content {
  display: block;
}

</style>
`
)}

function _35(md){return(
md` ---

### Utils`
)}

function _getColorViewer(ramp,swatches,d3){return(
function getColorViewer(value, form, interpolator) {
  return interpolator
    ? ramp(value.name, 256, form, true, value.value)
    : value.k
    ? ramp(value.name, value.k, form)
    : swatches(
        value.colors ? value.colors : d3[`scheme${value.name}`],
        value.name,
        form
      );
}
)}

function _37(md){return(
md`
Swatches and ramp functions comes from this Mike's [notebook](https://observablehq.com/@d3/color-schemes) but they are adapted for this notebook
`
)}

function _swatches(d3,svg,html){return(
function swatches(colors, name, form) {
  const n = colors.length;
  const dark = d3.lab(colors[0]).l < 50;
  const canvas = svg`<svg viewBox="0 0 ${n} 1" style="display:block;width:${n *
    33}px;height:33px;margin:0 -14px;">${colors.map(
    (c, i) => svg`<rect x=${i} width=1 height=1 fill=${c}>`
  )}`;
  const label = document.createElement("DIV");
  label.textContent = name;
  label.style.position = "absolute";
  label.style.top = "4px";
  label.style.color = dark ? `#fff` : `#000`;
  const cont = html`${canvas}${label}`;
  cont.value = colors;
  return cont;
}
)}

function _ramp(d3,svg,DOM,html){return(
function ramp(name, n, form, interpolator, interpolate) {
  let canvas;
  let colors;
  let dark;
  if (d3[`scheme${name}`] && d3[`scheme${name}`][n]) {
    colors = d3[`scheme${name}`][n];
    dark = d3.lab(colors[0]).l < 50;
  } else {
    if (!interpolate) interpolate = d3[`interpolate${name}`];
    colors = [];
    dark = d3.lab(interpolate(0)).l < 50;
    for (let i = 0; i < n; ++i) {
      colors.push(d3.rgb(interpolate(i / (n - 1))).hex());
    }
  }
  if (n < 128) {
    canvas = svg`<svg viewBox="0 0 ${n} 1" style="display:block;shape-rendering:crispEdges;width:calc(100% + 28px);height:33px;margin:0 -14px;cursor:pointer;" preserveAspectRatio="none">${colors.map(
      (c, i) => svg`<rect x=${i} width=1 height=1 fill=${c}>`
    )}`;
  } else {
    const context = (canvas = DOM.canvas(n, 1)).getContext("2d");
    canvas.style.margin = "0 -14px";
    canvas.style.width = "calc(100% + 28px)";
    canvas.style.height = "33px";
    for (let i = 0; i < n; ++i) {
      context.fillStyle = colors[i];
      context.fillRect(i, 0, 1, 1);
    }
  }
  const label = document.createElement("DIV");
  label.textContent = name;
  label.style.position = "absolute";
  label.style.top = "4px";
  label.style.color = dark ? `#fff` : `#000`;

  const cont = html`${canvas}${label}`;
  cont.value = interpolator
    ? interpolate
      ? interpolate
      : d3[`interpolate${name}`]
    : colors;

  return cont;
}
)}

function _40(md){return(
md` ---

### Import`
)}

function _d3(require){return(
require("d3-array@1", "d3-color@1", "d3-scale-chromatic@1", "d3-interpolate", "d3-scale")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["categoricalScheme"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("viewof categoricalScheme")).define("viewof categoricalScheme", ["colorSchemePicker"], _categoricalScheme);
  main.variable(observer("categoricalScheme")).define("categoricalScheme", ["Generators", "viewof categoricalScheme"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("viewof k")).define("viewof k", ["html","d3"], _k);
  main.variable(observer("k")).define("k", ["Generators", "viewof k"], (G, _) => G.input(_));
  main.variable(observer("viewof divergingScheme")).define("viewof divergingScheme", ["colorSchemePicker","k"], _divergingScheme);
  main.variable(observer("divergingScheme")).define("divergingScheme", ["Generators", "viewof divergingScheme"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("viewof sequentialSingleHueScheme")).define("viewof sequentialSingleHueScheme", ["colorSchemePicker","k"], _sequentialSingleHueScheme);
  main.variable(observer("sequentialSingleHueScheme")).define("sequentialSingleHueScheme", ["Generators", "viewof sequentialSingleHueScheme"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("viewof sequentialMultiHueScheme")).define("viewof sequentialMultiHueScheme", ["colorSchemePicker","k"], _sequentialMultiHueScheme);
  main.variable(observer("sequentialMultiHueScheme")).define("sequentialMultiHueScheme", ["Generators", "viewof sequentialMultiHueScheme"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("viewof customScheme")).define("viewof customScheme", ["colorSchemePicker","d3"], _customScheme);
  main.variable(observer("customScheme")).define("customScheme", ["Generators", "viewof customScheme"], (G, _) => G.input(_));
  main.variable(observer("colorSchemePicker")).define("colorSchemePicker", ["html","width","styles","d3","getColorViewer"], _colorSchemePicker);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["divergingInterpolator"], _18);
  main.variable(observer("viewof divergingInterpolator")).define("viewof divergingInterpolator", ["colorInterpolatorPicker"], _divergingInterpolator);
  main.variable(observer("divergingInterpolator")).define("divergingInterpolator", ["Generators", "viewof divergingInterpolator"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("viewof sequentialSingleHueInterpolator")).define("viewof sequentialSingleHueInterpolator", ["colorInterpolatorPicker"], _sequentialSingleHueInterpolator);
  main.variable(observer("sequentialSingleHueInterpolator")).define("sequentialSingleHueInterpolator", ["Generators", "viewof sequentialSingleHueInterpolator"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("viewof sequentialMultiHueInterpolator")).define("viewof sequentialMultiHueInterpolator", ["colorInterpolatorPicker"], _sequentialMultiHueInterpolator);
  main.variable(observer("sequentialMultiHueInterpolator")).define("sequentialMultiHueInterpolator", ["Generators", "viewof sequentialMultiHueInterpolator"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("viewof cyclicalInterpolator")).define("viewof cyclicalInterpolator", ["colorInterpolatorPicker"], _cyclicalInterpolator);
  main.variable(observer("cyclicalInterpolator")).define("cyclicalInterpolator", ["Generators", "viewof cyclicalInterpolator"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("viewof allD3Interpolator")).define("viewof allD3Interpolator", ["colorInterpolatorPicker"], _allD3Interpolator);
  main.variable(observer("allD3Interpolator")).define("allD3Interpolator", ["Generators", "viewof allD3Interpolator"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("viewof customInterpolator")).define("viewof customInterpolator", ["colorInterpolatorPicker","d3","customScheme"], _customInterpolator);
  main.variable(observer("customInterpolator")).define("customInterpolator", ["Generators", "viewof customInterpolator"], (G, _) => G.input(_));
  main.variable(observer("colorInterpolatorPicker")).define("colorInterpolatorPicker", ["html","d3","width","styles","getColorViewer"], _colorInterpolatorPicker);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("styles")).define("styles", ["html"], _styles);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer("getColorViewer")).define("getColorViewer", ["ramp","swatches","d3"], _getColorViewer);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer("swatches")).define("swatches", ["d3","svg","html"], _swatches);
  main.variable(observer("ramp")).define("ramp", ["d3","svg","DOM","html"], _ramp);
  main.variable(observer()).define(["md"], _40);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
