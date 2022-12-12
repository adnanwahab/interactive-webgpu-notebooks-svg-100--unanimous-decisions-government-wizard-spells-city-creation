// https://observablehq.com/@nhogs/easing-graphs-editor@1833
import define1 from "./001686205722b9dc@994.js";
import define2 from "./5a60cc7bf30e6483@985.js";
import define3 from "./ab3e70b29c480e6d@83.js";

function _1(md){return(
md`# Easing graphs editor`
)}

function _2(md,tex){return(
md`The editor allows you to create and edit a custom easing curve, which take a normalized time ${tex`t \in [0,1]`} and return an “eased” time ${tex`t'`}. The goal is to extend easing possibilities offered by D3.
Most of the visuals comes from D3's [easing graphs notebook](https://observablehq.com/@d3/easing) and [easing animations notebook](https://observablehq.com/@d3/easing-animations).

A custom easing curve is a collection of keyframes, each having a time (x), value (y), an "in tangent" and an "out tangent".`
)}

function _3(md){return(
md`~~~js
import {chartEditor, Curve, Keyframe} from "@nhogs/easing-graphs-editor"
~~~`
)}

function _4(md){return(
md`---`
)}

function _customEditor(chartEditor){return(
chartEditor({
  title: "Custom editor",
  easePreview: true,
  enableD3Easing: true,
  boundFirstLast: false
})
)}

function _chartEditor(html,d3EaseFunction,Curve,Keyframe,d3,copy,width,height,xAxis,margin,yAxis,x,y,chartEase,invalidation){return(
function chartEditor(config = {}) {
  let {
    easePreview,
    boundFirstLast = false,
    defaultCurve,
    enableD3Easing = false,
    title
  } = config;
  let useD3Easing = false;
  let editor = html`<div></div>`;
  let titleEditor = html`<span style="font: 700 1.5rem sans-serif;">${title}</span>`;
  let resetButton = `<button name=reset style="margin-right:1px">Reset</button>`;
  let copyButton = `<button name=copy style="margin-right:20px">Copy</button>`;
  let easingSelect = `<span style="display:${
    enableD3Easing ? "auto" : "none"
  }">D3 easing: <select name=d3Ease><option value="undefined" disabled>Custom</option>${d3EaseFunction.map(
    easeF =>
      `<option value=${easeF} ${
        defaultCurve === easeF ? `selected="selected"` : ""
      }>${easeF}</option>`
  )}</select></span>`;
  let action = html`<form style='margin-left:0px'>${resetButton}${copyButton}${easingSelect}</form>`;
  let previewTitle = html`<div>Ease preview</div>`;

  let curve = new Curve([
    new Keyframe({ time: 0, value: 0, inTangent: 0, outTangent: 0 }),
    new Keyframe({ time: 1, value: 1, inTangent: 0, outTangent: 0 })
  ]);

  if (defaultCurve !== undefined) {
    if (typeof defaultCurve === "string") {
      useD3Easing = true;
    } else {
      action.d3Ease.value = undefined;
      curve = defaultCurve.copy();
    }
  } else {
    action.d3Ease.value = undefined;
  }

  const line = d3.line();

  action.d3Ease.onchange = event => {
    useD3Easing = true;
    updateValue();
    update(true);
  };

  action.reset.onclick = event => {
    resetCurve();
    updateValue();
    update(true);
  };

  action.onsubmit = event => {
    event.preventDefault();
  };

  action.copy.onclick = event => {
    useD3Easing
      ? copy(`d3.${action.d3Ease.value}()`)
      : copy(
          `new Curve([${curve.keyframes
            .map(k => `new Keyframe(${JSON.stringify(k)})`)
            .join(',')}])`
        );
  };

  function resetCurve() {
    if (defaultCurve !== undefined) {
      if (typeof defaultCurve === "string") {
        useD3Easing = true;
        curve = new Curve([
          new Keyframe({ time: 0, value: 0, inTangent: 0, outTangent: 0 }),
          new Keyframe({ time: 1, value: 1, inTangent: 0, outTangent: 0 })
        ]);
        action.d3Ease.value = defaultCurve;
      } else {
        action.d3Ease.value = undefined;
        useD3Easing = false;
        curve = defaultCurve.copy();
      }
    } else {
      action.d3Ease.value = undefined;
      useD3Easing = false;
      curve = new Curve([
        new Keyframe({ time: 0, value: 0, inTangent: 0, outTangent: 0 }),
        new Keyframe({ time: 1, value: 1, inTangent: 0, outTangent: 0 })
      ]);
    }
  }

  const svg = d3
    .create("svg")
    .attr("cursor", "pointer")
    .attr("viewBox", [0, 0, width, height])
    .style("max-width", `${width}px`)
    .style("overflow", "visible");

  svg
    .append("g")
    .call(xAxis)
    .call(g =>
      g
        .append("text")
        .attr("x", width - margin.right)
        .attr("y", -3)
        .attr("fill", "currentColor")
        .attr("font-weight", "bold")
        .text("t")
    );

  svg
    .append("g")
    .call(yAxis)
    .call(g =>
      g
        .select(".tick:last-of-type text")
        .clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text("t′")
    );

  let g = svg
    .append("g")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    .attr("stroke-linecap", "round");

  svg.on("click", function(d) {
    if (d3.event.defaultPrevented) return;
    if (useD3Easing) {
      resetCurve();
      useD3Easing = false;
    }

    curve.addKey(
      new Keyframe({
        time: x.invert(d3.mouse(this)[0]),
        value: y.invert(d3.mouse(this)[1])
      })
    );
    updateValue();
    update(true);
  });

  function updateValue() {
    if (useD3Easing) {
      curve.evaluate = d3[action.d3Ease.value];
    }
    editor.value = t => curve.evaluate(t);
    editor.dispatchEvent(new CustomEvent("input"));
  }

  function update(runTransition) {
    g.selectAll("path")
      .data([t => curve.evaluate(t)])
      .join("path")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
      .attr("stroke-linecap", "round")
      .transition()
      .duration(runTransition ? 500 : 0)
      .attr("d", e => line(d3.ticks(0, 1, width).map(t => [x(t), y(e(t))])));

    g.selectAll(".tangentesCont")
      .data(useD3Easing ? [] : curve.keyframes, (d, i) => d.id)
      .join(enter =>
        enter
          .append("g")
          .attr("class", "tangentesCont")
          .each(function(d) {
            d3.select(this)
              .append("line")
              .attr("opacity", d => (d.id === curve.firstKeyframe.id ? 0 : 1))
              .attr("class", "inTangLine")
              .attr("fill", "none")
              .attr("stroke", "#008ec4");

            d3.select(this)
              .append("line")
              .attr("class", "outTangLine")
              .attr("opacity", d => (d.id === curve.lastKeyframe.id ? 0 : 1))
              .attr("fill", "none")
              .attr("stroke", "#008ec4");

            d3.select(this)
              .append("circle")
              .attr("stroke", "black")
              .attr("opacity", d => (d.id === curve.firstKeyframe.id ? 0 : 1))
              .attr("class", "inTangKey")
              .attr("stroke", "#008ec4")
              .attr("fill", "#008ec4")
              .attr("r", 5)
              .attr("cursor", "move")
              .call(
                d3
                  .drag()
                  .on("start", dragstartedKey)
                  .on("drag", draggedTangIn)
                  .on("end", dragendedKey)
              );

            d3.select(this)
              .append("circle")
              .attr("stroke", "black")
              .attr("opacity", d => (d.id === curve.lastKeyframe.id ? 0 : 1))
              .attr("class", "outTangKey")
              .attr("stroke", "#008ec4")
              .attr("fill", "#008ec4")
              .attr("r", 5)
              .attr("cursor", "move")
              .call(
                d3
                  .drag()
                  .on("start", dragstartedKey)
                  .on("drag", draggedTangOut)
                  .on("end", dragendedKey)
              );

            d3.select(this)
              .append("circle")
              .attr("class", "keyframe")
              .attr("stroke", "black")
              .attr("fill", "white")
              .attr("r", 5)
              .attr("cursor", "move")
              .on("contextmenu", d => {
                d3.event.preventDefault();
                curve.removeKey(d);
                updateValue();
                update(true);
              })
              .call(
                d3
                  .drag()
                  .on("start", dragstartedKey)
                  .on("drag", draggedKey)
                  .on("end", dragendedKey)
              );
          })
      )
      .each(function(d) {
        d3.select(this)
          .select(".keyframe")
          .attr("cx", x(d.time))
          .attr("cy", y(d.value))
          .attr("cursor", "move");

        d3.select(this)
          .select(".inTangKey")
          .attr("cx", x(d.getHandles().in.x))
          .attr("cy", y(d.getHandles().in.y))
          .attr("cursor", "move");

        d3.select(this)
          .select(".outTangKey")
          .attr("cx", x(d.getHandles().out.x))
          .attr("cy", y(d.getHandles().out.y));

        d3.select(this)
          .select(".inTangLine")
          .attr("stroke-width", '1')
          .attr("x1", x(d.getHandles().in.x))
          .attr("y1", y(d.getHandles().in.y))
          .attr("x2", x(d.time))
          .attr("y2", y(d.value));

        d3.select(this)
          .select(".outTangLine")
          .attr("stroke-width", '1')
          .attr("x1", x(d.time))
          .attr("y1", y(d.value))
          .attr("x2", x(d.getHandles().out.x))
          .attr("y2", y(d.getHandles().out.y));
      });
  }

  function dragstartedKey(d, i) {
    d3.select(this)
      .raise()
      .attr("r", 6);
  }

  function draggedKey(d) {
    curve.move(
      d,
      x.invert(d3.mouse(this)[0]),
      y.invert(d3.mouse(this)[1]),
      boundFirstLast
    );
    update();
  }

  function dragendedKey(d, i) {
    d3.select(this)
      .raise()
      .attr("r", 5);

    updateValue();
    update();
  }

  function draggedTangIn(d) {
    d.setInTangentFromHandle(
      x.invert(d3.mouse(this)[0]),
      y.invert(d3.mouse(this)[1])
    );
    update();
  }

  function draggedTangOut(d) {
    d.setOutTangentFromHandle(
      x.invert(d3.mouse(this)[0]),
      y.invert(d3.mouse(this)[1])
    );
    update();
  }

  updateValue();
  update();

  if (title !== undefined) editor.append(titleEditor);
  editor.append(action);
  editor.append(svg.node());
  if (easePreview) {
    editor.append(previewTitle);
    editor.append(chartEase(t => curve.evaluate(t), invalidation));
  }
  return editor;
}
)}

function _7(md){return(
md`
### Editor config
- _title_ : Displayed title of the editor (optionnal)
- _easePreview_ : Enable the traveling ball preview (optionnal)
- _boundFirstLast_ : Lock the first and last keyframe at 0 and 1 in time (x) (optionnal)
- _enableD3Easing_ : Enable d3 easing functions dropdown (optionnal)
- _defaultCurve_ : The default curve of the editor, it's either an instance of the Curve class (for exemple when you copy one) or the name of a d3 easing function as string ex: "easeBounce" (optionnal)

### Curve editing
- Click to add a keyframe
- Right click to delete a keyframe
- Drag a keyframe across the chart to change its values
- Drag the blue handles to edit its tangents
- Choose a d3 easing function with the dropdown
- Reset to default curve with 'Reset' button
- Copy the full curve with 'Copy' button
- Click on the preview to play it
`
)}

function _8(md){return(
md`---`
)}

function _9(md){return(
md`## Examples`
)}

function _Example1Editor(chartEditor,Curve,Keyframe){return(
chartEditor({
  title: "Editor with curve as default value",
  easePreview: true,
  enableD3Easing: true,
  boundFirstLast: true,
  defaultCurve: new Curve([
    new Keyframe({
      time: 0,
      value: 0,
      inTangent: 0,
      outTangent: 4,
      id: "O-18",
      inMagnitude: -0.1,
      outMagnitude: 0.1
    }),
    new Keyframe({
      time: 0.2,
      value: 0.6,
      inTangent: -1.5,
      outTangent: -1.8,
      id: "O-22",
      inMagnitude: -0.05,
      outMagnitude: 0.1
    }),
    new Keyframe({
      time: 1,
      value: 1,
      inTangent: 5,
      outTangent: 0,
      id: "O-19",
      inMagnitude: -0.075,
      outMagnitude: 0.1
    })
  ])
})
)}

function _Example2Editor(chartEditor){return(
chartEditor({
  title: "Editor with d3 easing function as default value",
  easePreview: true,
  enableD3Easing: true,
  defaultCurve: "easeBounce"
})
)}

function _12(md){return(
md`---`
)}

function _13(md){return(
md`## Easing graph editor in action :
- [Animating a cube in Three.js](https://observablehq.com/@tarte0/animation-curves-with-three-js)`
)}

function _14(md){return(
md`---`
)}

function _15(md){return(
md`## Classes`
)}

function _Keyframe(DOM){return(
class Keyframe {
  constructor({ time, value, inTangent, outTangent }) {
    this.time = Math.max(0, Math.min(1, time)) || 0;
    this.value = value || 0;
    this.inTangent = inTangent || 0;
    this.outTangent = outTangent || 0;
    this.id = DOM.uid().id;
    this.inMagnitude = -0.1;
    this.outMagnitude = 0.1;
  }

  getHandles() {
    return { in: this.getInHandle(), out: this.getOutHandle() };
  }

  getInHandle() {
    return {
      x: this.time + this.inMagnitude,
      y: this.value + this.inMagnitude * this.inTangent
    };
  }

  getOutHandle() {
    return {
      x: this.time + this.outMagnitude,
      y: this.value + this.outMagnitude * this.outTangent
    };
  }

  setTangentsFromHandles(tangents) {
    this.setInTangentFromHandle(tangents.in.x, tangents.in.y);
    this.setOutTangentFromHandle(tangents.out.x, tangents.out.y);
  }

  setInTangentFromHandle(x, y) {
    if(x >= this.time) return;
    this.inMagnitude = x - this.time;
    this.inTangent = (y - this.value) / this.inMagnitude;
  }

  setOutTangentFromHandle(x, y) {
    if(x <= this.time) return;
    this.outMagnitude = x - this.time;
    this.outTangent = (y - this.value) / this.outMagnitude;
  }
}
)}

function _Curve(Keyframe){return(
class Curve {
  constructor(keyframes) {
    const linearKeySet = [new Keyframe({ time: 0 }), new Keyframe({ time: 1 })];

    if (!keyframes || !Array.isArray(keyframes)) {
      this.keyframes = linearKeySet;
    } else {
      this.keyframes = keyframes;

      if (keyframes.length < 2)
        this.keyframes.concat(
          linearKeySet.splice(keyframes.length, 2 - keyframes.length)
        );
    }

    this.sortKeyframes();
  }

  addKey(keyframe) {
    this.addKeyframes([keyframe]);
  }

  removeKey(keyframe) {
    const foundIndex = this.keyframes.findIndex(
      kf => kf.time === keyframe.time
    );
    if (foundIndex > 0 && foundIndex < this.keyframes.length - 1)
      this.keyframes.splice(foundIndex, 1);
  }

  addKeyframes(keyframes) {
    keyframes.forEach(k => {
      const foundIndex = this.keyframes.findIndex(kf => kf.time === k.time);
      if (foundIndex === 0 || foundIndex === this.keyframes.length - 1) return;
      if (foundIndex >= 0) {
        this.keyframes[foundIndex] = k;
      } else this.keyframes.push(k);
    });

    this.sortKeyframes();
  }

  GetClosestKeyframes(t) {
    t = Math.max(0, Math.min(1, t));
    var lo = -1,
      hi = this.keyframes.length;
    while (hi - lo > 1) {
      var mid = Math.round((lo + hi) / 2);
      if (this.keyframes[mid].time <= t) lo = mid;
      else hi = mid;
    }
    if (this.keyframes[lo].time === t) hi = lo;
    if (lo === hi) {
      if (lo === 0) hi++;
      else lo--;
    }
    return [lo, hi];
  }

  evaluate(t) {
    return this.hermite(t, this.keyframes).y;
  }

  hermite(t, keyframes) {
    const n = keyframes.length;

    const [lo, hi] = this.GetClosestKeyframes(t);

    var i0 = lo;
    var i1 = i0 + 1;

    if (i0 > n - 1) throw new Error('Out of bounds');
    if (i0 === n - 1) i1 = i0;

    var scale = keyframes[i1].time - keyframes[i0].time;

    t = (t - keyframes[i0].time) / scale;

    var t2 = t * t;
    var it = 1 - t;
    var it2 = it * it;
    var tt = 2 * t;
    var h00 = (1 + tt) * it2;
    var h10 = t * it2;
    var h01 = t2 * (3 - tt);
    var h11 = t2 * (t - 1);

    const x =
      h00 * keyframes[i0].time +
      h10 * keyframes[i0].outTangent * scale +
      h01 * keyframes[i1].time +
      h11 * keyframes[i1].inTangent * scale;

    const y =
      h00 * keyframes[i0].value +
      h10 * keyframes[i0].outTangent * scale +
      h01 * keyframes[i1].value +
      h11 * keyframes[i1].inTangent * scale;

    return { x, y };
  }

  sortKeyframes() {
    this.keyframes.sort((a, b) => a.time - b.time);
    this.firstKeyframe = this.keyframes[0];
    this.lastKeyframe = this.keyframes[this.keyframes.length - 1];
  }

  move(keyframe, time, value, boundFirstLast) {
    const keyIndex = this.keyframes.indexOf(keyframe);

    if (keyIndex <= 0 || keyIndex >= this.keyframes.length - 1) {
      if (!boundFirstLast) {
        keyframe.value = value;
      }
      return;
    }
    keyframe.value = value;
    keyframe.time = Math.max(0.001, Math.min(time, 0.999));

    this.sortKeyframes();
  }

  copy() {
    return new Curve(
      this.keyframes.map(keyframe => {
        return new Keyframe({ ...keyframe });
      })
    );
  }
}
)}

function _d3EaseFunction(){return(
[
  "easeLinear",
  "easePolyIn",
  "easePolyOut",
  "easePoly",
  "easePolyInOut",
  "easeQuadIn",
  "easeQuadOut",
  "easeQuad",
  "easeQuadInOut",
  "easeCubicIn",
  "easeCubicOut",
  "easeCubic",
  "easeCubicInOut",
  "easeSinIn",
  "easeSinOut",
  "easeSin",
  "easeSinInOut",
  "easeExpIn",
  "easeExpOut",
  "easeExp",
  "easeExpInOut",
  "easeCircleIn",
  "easeCircleOut",
  "easeCircle",
  "easeCircleInOut",
  "easeElasticIn",
  "easeElastic",
  "easeElasticOut",
  "easeElasticInOut",
  "easeBackOut",
  "easeBack",
  "easeBackInOut",
  "easeBounceIn",
  "easeBounce",
  "easeBounceOut",
  "easeBounceInOut"
]
)}

function _19(md){return(
md `---`
)}

function _20(md){return(
md`## Imports`
)}

function _d3(require){return(
require("d3@5")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md","tex"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("viewof customEditor")).define("viewof customEditor", ["chartEditor"], _customEditor);
  main.variable(observer("customEditor")).define("customEditor", ["Generators", "viewof customEditor"], (G, _) => G.input(_));
  main.variable(observer("chartEditor")).define("chartEditor", ["html","d3EaseFunction","Curve","Keyframe","d3","copy","width","height","xAxis","margin","yAxis","x","y","chartEase","invalidation"], _chartEditor);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("viewof Example1Editor")).define("viewof Example1Editor", ["chartEditor","Curve","Keyframe"], _Example1Editor);
  main.variable(observer("Example1Editor")).define("Example1Editor", ["Generators", "viewof Example1Editor"], (G, _) => G.input(_));
  main.variable(observer("viewof Example2Editor")).define("viewof Example2Editor", ["chartEditor"], _Example2Editor);
  main.variable(observer("Example2Editor")).define("Example2Editor", ["Generators", "viewof Example2Editor"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("Keyframe")).define("Keyframe", ["DOM"], _Keyframe);
  main.variable(observer("Curve")).define("Curve", ["Keyframe"], _Curve);
  main.variable(observer("d3EaseFunction")).define("d3EaseFunction", _d3EaseFunction);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["md"], _20);
  const child1 = runtime.module(define1);
  main.import("x", child1);
  main.import("y", child1);
  main.import("xAxis", child1);
  main.import("yAxis", child1);
  main.import("width", child1);
  main.import("height", child1);
  main.import("margin", child1);
  const child2 = runtime.module(define2);
  main.import("chart", "chartEase", child2);
  const child3 = runtime.module(define3);
  main.import("copy", child3);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
