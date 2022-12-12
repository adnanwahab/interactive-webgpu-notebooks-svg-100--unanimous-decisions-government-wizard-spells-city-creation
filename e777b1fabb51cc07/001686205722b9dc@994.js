// https://observablehq.com/@d3/easing@994
function _1(md,tex){return(
md`# Easing Graphs

Eased transitions exhibit more plausible motion. [d3-ease](https://github.com/d3/d3-ease) implements various easing methods, visualized below, which take a normalized time ${tex`t \in [0,1]`} and return an “eased” time ${tex`t'`}. See also [easing animations](/@d3/easing-animations).`
)}

function _2(md){return(
md`---

## Linear`
)}

function _linear(md){return(
md`### easeLinear(*t*)

The identity function; no easing.`
)}

function _4(chart,d3){return(
chart([d3.easeLinear])
)}

function _5(md){return(
md`---

## Quadratic`
)}

function _quadIn(md){return(
md`### easeQuadIn(*t*)

Quadratic easing.`
)}

function _7(chart,d3){return(
chart([d3.easeQuadIn])
)}

function _quadOut(md){return(
md`### easeQuadOut(*t*)

Reversed quadratic easing.`
)}

function _9(chart,d3){return(
chart([d3.easeQuadOut])
)}

function _quad(md){return(
md`### easeQuad(*t*)

An alias for easeQuadInOut.`
)}

function _quadInOut(md){return(
md`### easeQuadInOut(*t*)

Mirrored quadratic easing.`
)}

function _12(chart,d3){return(
chart([d3.easeQuadInOut])
)}

function _13(md){return(
md`---

## Cubic`
)}

function _cubicIn(md){return(
md`### easeCubicIn(*t*)

Cubic easing.`
)}

function _15(chart,d3){return(
chart([d3.easeCubicIn])
)}

function _cubicOut(md){return(
md`### easeCubicOut(*t*)

Reversed cubic easing.`
)}

function _17(chart,d3){return(
chart([d3.easeCubicOut])
)}

function _cubic(md){return(
md`### easeCubic(*t*)

An alias for [easeCubicInOut](#cubicInOut).`
)}

function _cubicInOut(md){return(
md`### easeCubicInOut(*t*)

Mirrored cubic easing.`
)}

function _20(chart,d3){return(
chart([d3.easeCubicInOut])
)}

function _21(md){return(
md`---

## Polynomial

The default exponent is 3, equivalent to cubic easing.`
)}

function _polyConfig(config){return(
config("elastic", {
  exponent: {value: Math.log2(3), min: -3, max: 3, transform: x => Math.pow(2, x)}
})
)}

function _polyIn(md,polyConfig){return(
md`### easePolyIn.exponent(${polyConfig.exponent})(*t*)

Polynomial easing.`
)}

function _24(chart,d3,polyConfig){return(
chart([d3.easePolyIn.exponent(polyConfig.exponent)])
)}

function _polyOut(md,polyConfig){return(
md`### easePolyOut.exponent(${polyConfig.exponent})(*t*)

Reversed polynomial easing.`
)}

function _26(chart,d3,polyConfig){return(
chart([d3.easePolyOut.exponent(polyConfig.exponent)])
)}

function _polyInOut(md,polyConfig){return(
md`### easePolyInOut.exponent(${polyConfig.exponent})(*t*)

Mirrored polynomial easing.`
)}

function _28(chart,d3,polyConfig){return(
chart([d3.easePolyInOut.exponent(polyConfig.exponent)])
)}

function _29(md){return(
md`---

## Exponential`
)}

function _expIn(md){return(
md`### easeExpIn(*t*)

Exponential easing.`
)}

function _31(chart,d3){return(
chart([d3.easeExpIn])
)}

function _expOut(md){return(
md`### easeExpOut(*t*)

Reversed exponential easing.`
)}

function _33(chart,d3){return(
chart([d3.easeExpOut])
)}

function _exp(md){return(
md`### easeExp(*t*)

An alias for easeExpInOut.`
)}

function _expInOut(md){return(
md`### easeExpInOut(*t*)

Mirrored exponential easing.`
)}

function _36(chart,d3){return(
chart([d3.easeExpInOut])
)}

function _37(md){return(
md`---

## Sinusoidal`
)}

function _sinIn(md){return(
md`### easeSinIn(*t*)

Sinusoidal easing.`
)}

function _39(chart,d3){return(
chart([d3.easeSinIn])
)}

function _sinOut(md){return(
md`### easeSinOut(*t*)

Reversed sinusoidal easing.`
)}

function _41(chart,d3){return(
chart([d3.easeSinOut])
)}

function _sin(md){return(
md`### easeSin(*t*)

An alias for easeSinInOut.`
)}

function _sinInOut(md){return(
md`### easeSinInOut(*t*)

Mirrored sinusoidal easing.`
)}

function _44(chart,d3){return(
chart([d3.easeSinInOut])
)}

function _45(md){return(
md`---

## Circle`
)}

function _circleIn(md){return(
md`### easeCircleIn(*t*)

Circular easing.`
)}

function _47(chart,d3){return(
chart([d3.easeCircleIn])
)}

function _circleOut(md){return(
md`### easeCircleOut(*t*)

Reversed circular easing.`
)}

function _49(chart,d3){return(
chart([d3.easeCircleOut])
)}

function _circle(md){return(
md`### easeCircle(*t*)

An alias for easeCircleInOut.`
)}

function _circleInOut(md){return(
md`### easeCircleInOut(*t*)

Mirrored circular easing.`
)}

function _52(chart,d3){return(
chart([d3.easeCircleInOut])
)}

function _53(md){return(
md`---

## Elastic

The default amplitude is 1.0 and the default period is 0.3.`
)}

function _elasticConfig(config){return(
config("elastic", {
  amplitude: {value: 1, min: 1, max: 3},
  period: {value: 0.3, min: 0.04, max: 2}
})
)}

function _elasticIn(md,elasticConfig){return(
md`### easeElasticIn.amplitude(${elasticConfig.amplitude}).period(${elasticConfig.period})(*t*)

Elastic easing, like a rubber band.`
)}

function _56(chart,d3,elasticConfig){return(
chart([d3.easeElasticIn.amplitude(elasticConfig.amplitude).period(elasticConfig.period)])
)}

function _elastic(md){return(
md`### easeElastic(*t*)

An alias for easeElasticOut.`
)}

function _elasticOut(md,elasticConfig){return(
md`### easeElasticOut.amplitude(${elasticConfig.amplitude}).period(${elasticConfig.period})(*t*)

Reversed elastic easing, like a rubber band.`
)}

function _59(chart,d3,elasticConfig){return(
chart([d3.easeElasticOut.amplitude(elasticConfig.amplitude).period(elasticConfig.period)])
)}

function _elasticInOut(md,elasticConfig){return(
md`### easeElasticInOut.amplitude(${elasticConfig.amplitude}).period(${elasticConfig.period})(*t*)

Mirrored elastic easing.`
)}

function _61(chart,d3,elasticConfig){return(
chart([d3.easeElasticInOut.amplitude(elasticConfig.amplitude).period(elasticConfig.period)])
)}

function _62(md){return(
md`---

## Back

The default overshoot is 1.70158.`
)}

function _backConfig(config){return(
config("back", {
  overshoot: {value: 1.70158, min: 0, max: 3}
})
)}

function _backIn(md,backConfig){return(
md`### easeBackIn.overshoot(${backConfig.overshoot})(*t*)

Anticipatory easing, like a dancer bending his knees before jumping.`
)}

function _65(chart,d3,backConfig){return(
chart([d3.easeBackIn.overshoot(backConfig.overshoot)])
)}

function _backOut(md,backConfig){return(
md`### easeBackOut.overshoot(${backConfig.overshoot})(*t*)

Reversed anticipatory easing.`
)}

function _67(chart,d3,backConfig){return(
chart([d3.easeBackOut.overshoot(backConfig.overshoot)])
)}

function _back(md){return(
md`### easeBack(*t*)

An alias for easeBackInOut.`
)}

function _backInOut(md,backConfig){return(
md`### easeBackInOut.overshoot(${backConfig.overshoot})(*t*)

Mirrored anticipatory easing.`
)}

function _70(chart,d3,backConfig){return(
chart([d3.easeBackInOut.overshoot(backConfig.overshoot)])
)}

function _71(md){return(
md`---

## Bounce`
)}

function _bounceIn(md){return(
md`### easeBounceIn(*t*)

Bounce easing, like a rubber ball.`
)}

function _73(chart,d3){return(
chart([d3.easeBounceIn])
)}

function _bounce(md){return(
md`### easeBounce(*t*)

An alias for easeBounceOut.`
)}

function _bounceOut(md){return(
md`### easeBounceOut(*t*)

Bounce easing, like a rubber ball.`
)}

function _76(chart,d3){return(
chart([d3.easeBounceOut])
)}

function _bounceInOut(md){return(
md`### easeBounceInOut(*t*)

Mirrored bounce easing.`
)}

function _78(chart,d3){return(
chart([d3.easeBounceInOut])
)}

function _79(md){return(
md`---

## Appendix`
)}

function _config(html){return(
function config(type, settings = {}) {
  let value = {};
  const form = html`<form style="font: 12px var(--sans-serif); display: flex; flex-direction: column; justify-content: center; min-height: 33px;">
    ${Object.entries(settings).map(([name, {min, max}]) => html`<label style="display: flex; align-items: center;">
      <input type="range" name="${name}" min="${min}" max="${max}" step="any" style="width: 180px;">
      <div style="margin-left: 0.5em;"><i>${type}</i>.${name}(<output></output>)</div>
    </label>`)}
</form>`;
  for (const [name, {value: defaultValue, transform = x => +x}] of Object.entries(settings)) {
    value[name] = transform(defaultValue);
    form[name].value = defaultValue;
    form[name].parentNode.querySelector("output").value = value[name].toFixed(2);
    form[name].oninput = () => {
      form.value = value = {...value, [name]: +transform(form[name].valueAsNumber).toPrecision(3)};
      form[name].parentNode.querySelector("output").value = value[name].toFixed(2);
    };
  }
  form.value = value;
  return form;
}
)}

function _chart(d3,width,height,x,y,xAxis,margin,yAxis){return(
function chart(eases) {
  const line = d3.line();

  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .style("max-width", `${width}px`)
      .style("overflow", "visible");

  svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
      .attr("stroke-linecap", "round")
    .selectAll("path")
    .data(eases)
    .join("path")
      .attr("stroke-width", (e, i) => i < eases.length - 1 ? 0.25 : null)
      .attr("d", e => line(d3.ticks(0, 1, width).map(t => [x(t), y(e(t))])));

  svg.append("g")
      .call(xAxis)
      .call(g => g.append("text")
          .attr("x", width - margin.right)
          .attr("y", -3)
          .attr("fill", "currentColor")
          .attr("font-weight", "bold")
          .text("t"));

  svg.append("g")
      .call(yAxis)
      .call(g => g.select(".tick:last-of-type text").clone()
          .attr("x", 3)
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .text("t′"));

  return svg.node();
}
)}

function _x(d3,margin,width){return(
d3.scaleLinear().range([margin.left, width - margin.right])
)}

function _y(d3,height,margin){return(
d3.scaleLinear().range([height - margin.bottom, margin.top])
)}

function _xAxis(height,margin,d3,x,width){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom + 6})`)
    .call(d3.axisBottom(x.copy().interpolate(d3.interpolateRound)).ticks(width / 60))
    .call(g => g.select(".domain").remove())
    .call(g => g.selectAll(".tick line").clone()
        .attr("stroke-opacity", 0.1)
        .attr("y1", margin.bottom + margin.top - height - 12))
)}

function _yAxis(margin,d3,y,width){return(
g => g
    .attr("transform", `translate(${margin.left - 6},0)`)
    .call(d3.axisLeft(y.copy().interpolate(d3.interpolateRound)).ticks(5))
    .call(g => g.select(".domain").remove())
    .call(g => g.selectAll(".tick line").clone()
        .attr("stroke-opacity", 0.1)
        .attr("x1", width - margin.left - margin.right + 12))
)}

function _width(){return(
640
)}

function _height(){return(
240
)}

function _margin(){return(
{top: 10, right: 20, bottom: 20, left: 30}
)}

function _d3(require){return(
require("d3@6")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md","tex"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("linear")).define("linear", ["md"], _linear);
  main.variable(observer()).define(["chart","d3"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("quadIn")).define("quadIn", ["md"], _quadIn);
  main.variable(observer()).define(["chart","d3"], _7);
  main.variable(observer("quadOut")).define("quadOut", ["md"], _quadOut);
  main.variable(observer()).define(["chart","d3"], _9);
  main.variable(observer("quad")).define("quad", ["md"], _quad);
  main.variable(observer("quadInOut")).define("quadInOut", ["md"], _quadInOut);
  main.variable(observer()).define(["chart","d3"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("cubicIn")).define("cubicIn", ["md"], _cubicIn);
  main.variable(observer()).define(["chart","d3"], _15);
  main.variable(observer("cubicOut")).define("cubicOut", ["md"], _cubicOut);
  main.variable(observer()).define(["chart","d3"], _17);
  main.variable(observer("cubic")).define("cubic", ["md"], _cubic);
  main.variable(observer("cubicInOut")).define("cubicInOut", ["md"], _cubicInOut);
  main.variable(observer()).define(["chart","d3"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("viewof polyConfig")).define("viewof polyConfig", ["config"], _polyConfig);
  main.variable(observer("polyConfig")).define("polyConfig", ["Generators", "viewof polyConfig"], (G, _) => G.input(_));
  main.variable(observer("polyIn")).define("polyIn", ["md","polyConfig"], _polyIn);
  main.variable(observer()).define(["chart","d3","polyConfig"], _24);
  main.variable(observer("polyOut")).define("polyOut", ["md","polyConfig"], _polyOut);
  main.variable(observer()).define(["chart","d3","polyConfig"], _26);
  main.variable(observer("polyInOut")).define("polyInOut", ["md","polyConfig"], _polyInOut);
  main.variable(observer()).define(["chart","d3","polyConfig"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("expIn")).define("expIn", ["md"], _expIn);
  main.variable(observer()).define(["chart","d3"], _31);
  main.variable(observer("expOut")).define("expOut", ["md"], _expOut);
  main.variable(observer()).define(["chart","d3"], _33);
  main.variable(observer("exp")).define("exp", ["md"], _exp);
  main.variable(observer("expInOut")).define("expInOut", ["md"], _expInOut);
  main.variable(observer()).define(["chart","d3"], _36);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer("sinIn")).define("sinIn", ["md"], _sinIn);
  main.variable(observer()).define(["chart","d3"], _39);
  main.variable(observer("sinOut")).define("sinOut", ["md"], _sinOut);
  main.variable(observer()).define(["chart","d3"], _41);
  main.variable(observer("sin")).define("sin", ["md"], _sin);
  main.variable(observer("sinInOut")).define("sinInOut", ["md"], _sinInOut);
  main.variable(observer()).define(["chart","d3"], _44);
  main.variable(observer()).define(["md"], _45);
  main.variable(observer("circleIn")).define("circleIn", ["md"], _circleIn);
  main.variable(observer()).define(["chart","d3"], _47);
  main.variable(observer("circleOut")).define("circleOut", ["md"], _circleOut);
  main.variable(observer()).define(["chart","d3"], _49);
  main.variable(observer("circle")).define("circle", ["md"], _circle);
  main.variable(observer("circleInOut")).define("circleInOut", ["md"], _circleInOut);
  main.variable(observer()).define(["chart","d3"], _52);
  main.variable(observer()).define(["md"], _53);
  main.variable(observer("viewof elasticConfig")).define("viewof elasticConfig", ["config"], _elasticConfig);
  main.variable(observer("elasticConfig")).define("elasticConfig", ["Generators", "viewof elasticConfig"], (G, _) => G.input(_));
  main.variable(observer("elasticIn")).define("elasticIn", ["md","elasticConfig"], _elasticIn);
  main.variable(observer()).define(["chart","d3","elasticConfig"], _56);
  main.variable(observer("elastic")).define("elastic", ["md"], _elastic);
  main.variable(observer("elasticOut")).define("elasticOut", ["md","elasticConfig"], _elasticOut);
  main.variable(observer()).define(["chart","d3","elasticConfig"], _59);
  main.variable(observer("elasticInOut")).define("elasticInOut", ["md","elasticConfig"], _elasticInOut);
  main.variable(observer()).define(["chart","d3","elasticConfig"], _61);
  main.variable(observer()).define(["md"], _62);
  main.variable(observer("viewof backConfig")).define("viewof backConfig", ["config"], _backConfig);
  main.variable(observer("backConfig")).define("backConfig", ["Generators", "viewof backConfig"], (G, _) => G.input(_));
  main.variable(observer("backIn")).define("backIn", ["md","backConfig"], _backIn);
  main.variable(observer()).define(["chart","d3","backConfig"], _65);
  main.variable(observer("backOut")).define("backOut", ["md","backConfig"], _backOut);
  main.variable(observer()).define(["chart","d3","backConfig"], _67);
  main.variable(observer("back")).define("back", ["md"], _back);
  main.variable(observer("backInOut")).define("backInOut", ["md","backConfig"], _backInOut);
  main.variable(observer()).define(["chart","d3","backConfig"], _70);
  main.variable(observer()).define(["md"], _71);
  main.variable(observer("bounceIn")).define("bounceIn", ["md"], _bounceIn);
  main.variable(observer()).define(["chart","d3"], _73);
  main.variable(observer("bounce")).define("bounce", ["md"], _bounce);
  main.variable(observer("bounceOut")).define("bounceOut", ["md"], _bounceOut);
  main.variable(observer()).define(["chart","d3"], _76);
  main.variable(observer("bounceInOut")).define("bounceInOut", ["md"], _bounceInOut);
  main.variable(observer()).define(["chart","d3"], _78);
  main.variable(observer()).define(["md"], _79);
  main.variable(observer("config")).define("config", ["html"], _config);
  main.variable(observer("chart")).define("chart", ["d3","width","height","x","y","xAxis","margin","yAxis"], _chart);
  main.variable(observer("x")).define("x", ["d3","margin","width"], _x);
  main.variable(observer("y")).define("y", ["d3","height","margin"], _y);
  main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","x","width"], _xAxis);
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3","y","width"], _yAxis);
  main.variable(observer("width")).define("width", _width);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
