// https://observablehq.com/@d3/easing-animations@985
function _1(md,tex){return(
md`# Easing Animations

Eased transitions exhibit more plausible motion. [d3-ease](https://github.com/d3/d3-ease) implements various easing methods, demonstrated below, which take a normalized time ${tex`t \in [0,1]`} and return an “eased” time ${tex`t'`}. Click to restart the animation. See also [easing graphs](/@d3/easing).`
)}

function _2(md){return(
md`---

## Linear`
)}

function _linear(md){return(
md`### easeLinear(*t*)

The identity function; no easing.`
)}

function _4(chart,d3,invalidation){return(
chart(d3.easeLinear, invalidation)
)}

function _5(md){return(
md`---

## Quadratic`
)}

function _quadIn(md){return(
md`### easeQuadIn(*t*)

Quadratic easing.`
)}

function _7(chart,d3,invalidation){return(
chart(d3.easeQuadIn, invalidation)
)}

function _quadOut(md){return(
md`### easeQuadOut(*t*)

Reversed quadratic easing.`
)}

function _9(chart,d3,invalidation){return(
chart(d3.easeQuadOut, invalidation)
)}

function _quad(md){return(
md`### easeQuad(*t*)

An alias for easeQuadInOut.`
)}

function _quadInOut(md){return(
md`### easeQuadInOut(*t*)

Mirrored quadratic easing.`
)}

function _12(chart,d3,invalidation){return(
chart(d3.easeQuadInOut, invalidation)
)}

function _13(md){return(
md`---

## Cubic`
)}

function _cubicIn(md){return(
md`### easeCubicIn(*t*)

Cubic easing.`
)}

function _15(chart,d3,invalidation){return(
chart(d3.easeCubicIn, invalidation)
)}

function _cubicOut(md){return(
md`### easeCubicOut(*t*)

Reversed cubic easing.`
)}

function _17(chart,d3,invalidation){return(
chart(d3.easeCubicOut, invalidation)
)}

function _cubic(md){return(
md`### easeCubic(*t*)

An alias for [easeCubicInOut](#cubicInOut).`
)}

function _cubicInOut(md){return(
md`### easeCubicInOut(*t*)

Mirrored cubic easing.`
)}

function _20(chart,d3,invalidation){return(
chart(d3.easeCubicInOut, invalidation)
)}

function _21(md){return(
md`---

## Polynomial

The default exponent is 3, equivalent to cubic easing.`
)}

function _exponent(html)
{
  const form = html`<form>
    <input type=range name=i min=-3 max=3 value=${Math.log2(3)} step=any>
    <i>poly</i>.exponent(<output name=o></output>)`;
  form.i.oninput = () => {
    form.value = +Math.pow(2, form.i.valueAsNumber).toPrecision(3);
    form.o.value = form.value;
  };
  form.i.oninput();
  return form;
}


function _polyIn(md,exponent){return(
md`### easePolyIn.exponent(${exponent})(*t*)

Polynomial easing.`
)}

function _24(chart,d3,exponent,invalidation){return(
chart(d3.easePolyIn.exponent(exponent), invalidation)
)}

function _polyOut(md,exponent){return(
md`### easePolyOut.exponent(${exponent})(*t*)

Reversed polynomial easing.`
)}

function _26(chart,d3,exponent,invalidation){return(
chart(d3.easePolyOut.exponent(exponent), invalidation)
)}

function _polyInOut(md,exponent){return(
md`### easePolyInOut.exponent(${exponent})(*t*)

Mirrored polynomial easing.`
)}

function _28(chart,d3,exponent,invalidation){return(
chart(d3.easePolyInOut.exponent(exponent), invalidation)
)}

function _29(md){return(
md`---

## Exponential`
)}

function _expIn(md){return(
md`### easeExpIn(*t*)

Exponential easing.`
)}

function _31(chart,d3,invalidation){return(
chart(d3.easeExpIn, invalidation)
)}

function _expOut(md){return(
md`### easeExpOut(*t*)

Reversed exponential easing.`
)}

function _33(chart,d3,invalidation){return(
chart(d3.easeExpOut, invalidation)
)}

function _exp(md){return(
md`### easeExp(*t*)

An alias for easeExpInOut.`
)}

function _expInOut(md){return(
md`### easeExpInOut(*t*)

Mirrored exponential easing.`
)}

function _36(chart,d3,invalidation){return(
chart(d3.easeExpInOut, invalidation)
)}

function _37(md){return(
md`---

## Sinusoidal`
)}

function _sinIn(md){return(
md`### easeSinIn(*t*)

Sinusoidal easing.`
)}

function _39(chart,d3,invalidation){return(
chart(d3.easeSinIn, invalidation)
)}

function _sinOut(md){return(
md`### easeSinOut(*t*)

Reversed sinusoidal easing.`
)}

function _41(chart,d3,invalidation){return(
chart(d3.easeSinOut, invalidation)
)}

function _sin(md){return(
md`### easeSin(*t*)

An alias for easeSinInOut.`
)}

function _sinInOut(md){return(
md`### easeSinInOut(*t*)

Mirrored sinusoidal easing.`
)}

function _44(chart,d3,invalidation){return(
chart(d3.easeSinInOut, invalidation)
)}

function _45(md){return(
md`---

## Circle`
)}

function _circleIn(md){return(
md`### easeCircleIn(*t*)

Circular easing.`
)}

function _47(chart,d3,invalidation){return(
chart(d3.easeCircleIn, invalidation)
)}

function _circleOut(md){return(
md`### easeCircleOut(*t*)

Reversed circular easing.`
)}

function _49(chart,d3,invalidation){return(
chart(d3.easeCircleOut, invalidation)
)}

function _circle(md){return(
md`### easeCircle(*t*)

An alias for easeCircleInOut.`
)}

function _circleInOut(md){return(
md`### easeCircleInOut(*t*)

Mirrored circular easing.`
)}

function _52(chart,d3,invalidation){return(
chart(d3.easeCircleInOut, invalidation)
)}

function _53(md){return(
md`---

## Elastic

The default amplitude is 1.0 and the default period is 0.3.`
)}

function _amplitude(html)
{
  const form = html`<form>
    <input type=range name=i min=1 max=3 value=${1} step=any>
    <i>elastic</i>.amplitude(<output name=o></output>)`;
  form.i.oninput = () => {
    form.value = +form.i.valueAsNumber.toPrecision(3);
    form.o.value = form.value.toFixed(2);
  };
  form.i.oninput();
  return form;
}


function _period(html)
{
  const form = html`<form>
    <input type=range name=i min=0.04 max=2 value=0.3 step=any>
    <i>elastic</i>.period(<output name=o></output>)`;
  form.i.oninput = () => {
    form.value = +form.i.valueAsNumber.toPrecision(3);
    form.o.value = form.value.toFixed(2);
  };
  form.i.oninput();
  return form;
}


function _elasticIn(md,amplitude,period){return(
md`### easeElasticIn.amplitude(${amplitude}).period(${period})(*t*)

Elastic easing, like a rubber band.`
)}

function _57(chart,d3,amplitude,period,invalidation){return(
chart(d3.easeElasticIn.amplitude(amplitude).period(period), invalidation)
)}

function _elastic(md){return(
md`### easeElastic(*t*)

An alias for easeElasticOut.`
)}

function _elasticOut(md,amplitude,period){return(
md`### easeElasticOut.amplitude(${amplitude}).period(${period})(*t*)

Reversed elastic easing, like a rubber band.`
)}

function _60(chart,d3,amplitude,period,invalidation){return(
chart(d3.easeElasticOut.amplitude(amplitude).period(period), invalidation)
)}

function _elasticInOut(md,amplitude,period){return(
md`### easeElasticInOut.amplitude(${amplitude}).period(${period})(*t*)

Mirrored elastic easing.`
)}

function _62(chart,d3,amplitude,period,invalidation){return(
chart(d3.easeElasticInOut.amplitude(amplitude).period(period), invalidation)
)}

function _63(md){return(
md`---

## Back

The default overshoot is 1.70158.`
)}

function _overshoot(html)
{
  const form = html`<form>
    <input type=range name=i min=0 max=3 value=${1.70158} step=any>
    <i>back</i>.overshoot(<output name=o></output>)`;
  form.i.oninput = () => {
    form.value = +form.i.valueAsNumber.toPrecision(3);
    form.o.value = form.value.toFixed(2);
  };
  form.i.oninput();
  return form;
}


function _backIn(md,overshoot){return(
md`### easeBackIn.overshoot(${overshoot})(*t*)

Anticipatory easing, like a dancer bending his knees before jumping.`
)}

function _66(chart,d3,overshoot,invalidation){return(
chart(d3.easeBackIn.overshoot(overshoot), invalidation)
)}

function _backOut(md,overshoot){return(
md`### easeBackOut.overshoot(${overshoot})(*t*)

Reversed anticipatory easing.`
)}

function _68(chart,d3,overshoot,invalidation){return(
chart(d3.easeBackOut.overshoot(overshoot), invalidation)
)}

function _back(md){return(
md`### easeBack(*t*)

An alias for easeBackInOut.`
)}

function _backInOut(md,overshoot){return(
md`### easeBackInOut.overshoot(${overshoot})(*t*)

Mirrored anticipatory easing.`
)}

function _71(chart,d3,overshoot,invalidation){return(
chart(d3.easeBackInOut.overshoot(overshoot), invalidation)
)}

function _72(md){return(
md`---

## Bounce`
)}

function _bounceIn(md){return(
md`### easeBounceIn(*t*)

Bounce easing, like a rubber ball.`
)}

function _74(chart,d3,invalidation){return(
chart(d3.easeBounceIn, invalidation)
)}

function _bounce(md){return(
md`### easeBounce(*t*)

An alias for easeBounceOut.`
)}

function _bounceOut(md){return(
md`### easeBounceOut(*t*)

Bounce easing, like a rubber ball.`
)}

function _77(chart,d3,invalidation){return(
chart(d3.easeBounceOut, invalidation)
)}

function _bounceInOut(md){return(
md`### easeBounceInOut(*t*)

Mirrored bounce easing.`
)}

function _79(chart,d3,invalidation){return(
chart(d3.easeBounceInOut, invalidation)
)}

function _80(md){return(
md`---

## Appendix`
)}

function _chart(d3,width,height,x,margin,xAxis,IntersectionObserver){return(
function chart(ease, invalidation) {
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .style("max-width", `${width}px`)
      .style("overflow", "visible")
      .style("cursor", "pointer")
      .on("click", () => animate(0));

  const circle = svg.append("circle")
      .attr("cx", x(0))
      .attr("cy", (height - margin.bottom + margin.top) / 2)
      .attr("r", 12);

  svg.append("g")
      .call(xAxis);

  function animate(delay) {
    circle.transition()
        .ease(ease)
        .delay(delay)
        .duration(1500)
        .attrTween("r", () => (circle.attr("r", 12), null))
        .attrTween("cx", () => x)
      .transition()
        .delay(1500)
        .duration(250)
        .ease(d3.easeCubicIn)
        .attr("r", 0)
      .transition()
        .attr("cx", x(0))
      .transition()
        .ease(d3.easeCubicOut)
        .attr("r", 12);
  }

  const observer = new IntersectionObserver(entries => {
    const entry = entries.pop();
    if (entry.intersectionRatio >= 0.9) animate(500);
    else if (entry.intersectionRatio <= 0) circle.interrupt();
  }, {
    threshold: [0, 0.9]
  });

  observer.observe(svg.node());
  invalidation.then(() => observer.disconnect());
  return svg.node();
}
)}

function _x(d3,margin,width){return(
d3.scaleLinear().range([margin.left, width - margin.right])
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

function _width(){return(
640
)}

function _height(){return(
48
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
  main.variable(observer()).define(["chart","d3","invalidation"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("quadIn")).define("quadIn", ["md"], _quadIn);
  main.variable(observer()).define(["chart","d3","invalidation"], _7);
  main.variable(observer("quadOut")).define("quadOut", ["md"], _quadOut);
  main.variable(observer()).define(["chart","d3","invalidation"], _9);
  main.variable(observer("quad")).define("quad", ["md"], _quad);
  main.variable(observer("quadInOut")).define("quadInOut", ["md"], _quadInOut);
  main.variable(observer()).define(["chart","d3","invalidation"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("cubicIn")).define("cubicIn", ["md"], _cubicIn);
  main.variable(observer()).define(["chart","d3","invalidation"], _15);
  main.variable(observer("cubicOut")).define("cubicOut", ["md"], _cubicOut);
  main.variable(observer()).define(["chart","d3","invalidation"], _17);
  main.variable(observer("cubic")).define("cubic", ["md"], _cubic);
  main.variable(observer("cubicInOut")).define("cubicInOut", ["md"], _cubicInOut);
  main.variable(observer()).define(["chart","d3","invalidation"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("viewof exponent")).define("viewof exponent", ["html"], _exponent);
  main.variable(observer("exponent")).define("exponent", ["Generators", "viewof exponent"], (G, _) => G.input(_));
  main.variable(observer("polyIn")).define("polyIn", ["md","exponent"], _polyIn);
  main.variable(observer()).define(["chart","d3","exponent","invalidation"], _24);
  main.variable(observer("polyOut")).define("polyOut", ["md","exponent"], _polyOut);
  main.variable(observer()).define(["chart","d3","exponent","invalidation"], _26);
  main.variable(observer("polyInOut")).define("polyInOut", ["md","exponent"], _polyInOut);
  main.variable(observer()).define(["chart","d3","exponent","invalidation"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("expIn")).define("expIn", ["md"], _expIn);
  main.variable(observer()).define(["chart","d3","invalidation"], _31);
  main.variable(observer("expOut")).define("expOut", ["md"], _expOut);
  main.variable(observer()).define(["chart","d3","invalidation"], _33);
  main.variable(observer("exp")).define("exp", ["md"], _exp);
  main.variable(observer("expInOut")).define("expInOut", ["md"], _expInOut);
  main.variable(observer()).define(["chart","d3","invalidation"], _36);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer("sinIn")).define("sinIn", ["md"], _sinIn);
  main.variable(observer()).define(["chart","d3","invalidation"], _39);
  main.variable(observer("sinOut")).define("sinOut", ["md"], _sinOut);
  main.variable(observer()).define(["chart","d3","invalidation"], _41);
  main.variable(observer("sin")).define("sin", ["md"], _sin);
  main.variable(observer("sinInOut")).define("sinInOut", ["md"], _sinInOut);
  main.variable(observer()).define(["chart","d3","invalidation"], _44);
  main.variable(observer()).define(["md"], _45);
  main.variable(observer("circleIn")).define("circleIn", ["md"], _circleIn);
  main.variable(observer()).define(["chart","d3","invalidation"], _47);
  main.variable(observer("circleOut")).define("circleOut", ["md"], _circleOut);
  main.variable(observer()).define(["chart","d3","invalidation"], _49);
  main.variable(observer("circle")).define("circle", ["md"], _circle);
  main.variable(observer("circleInOut")).define("circleInOut", ["md"], _circleInOut);
  main.variable(observer()).define(["chart","d3","invalidation"], _52);
  main.variable(observer()).define(["md"], _53);
  main.variable(observer("viewof amplitude")).define("viewof amplitude", ["html"], _amplitude);
  main.variable(observer("amplitude")).define("amplitude", ["Generators", "viewof amplitude"], (G, _) => G.input(_));
  main.variable(observer("viewof period")).define("viewof period", ["html"], _period);
  main.variable(observer("period")).define("period", ["Generators", "viewof period"], (G, _) => G.input(_));
  main.variable(observer("elasticIn")).define("elasticIn", ["md","amplitude","period"], _elasticIn);
  main.variable(observer()).define(["chart","d3","amplitude","period","invalidation"], _57);
  main.variable(observer("elastic")).define("elastic", ["md"], _elastic);
  main.variable(observer("elasticOut")).define("elasticOut", ["md","amplitude","period"], _elasticOut);
  main.variable(observer()).define(["chart","d3","amplitude","period","invalidation"], _60);
  main.variable(observer("elasticInOut")).define("elasticInOut", ["md","amplitude","period"], _elasticInOut);
  main.variable(observer()).define(["chart","d3","amplitude","period","invalidation"], _62);
  main.variable(observer()).define(["md"], _63);
  main.variable(observer("viewof overshoot")).define("viewof overshoot", ["html"], _overshoot);
  main.variable(observer("overshoot")).define("overshoot", ["Generators", "viewof overshoot"], (G, _) => G.input(_));
  main.variable(observer("backIn")).define("backIn", ["md","overshoot"], _backIn);
  main.variable(observer()).define(["chart","d3","overshoot","invalidation"], _66);
  main.variable(observer("backOut")).define("backOut", ["md","overshoot"], _backOut);
  main.variable(observer()).define(["chart","d3","overshoot","invalidation"], _68);
  main.variable(observer("back")).define("back", ["md"], _back);
  main.variable(observer("backInOut")).define("backInOut", ["md","overshoot"], _backInOut);
  main.variable(observer()).define(["chart","d3","overshoot","invalidation"], _71);
  main.variable(observer()).define(["md"], _72);
  main.variable(observer("bounceIn")).define("bounceIn", ["md"], _bounceIn);
  main.variable(observer()).define(["chart","d3","invalidation"], _74);
  main.variable(observer("bounce")).define("bounce", ["md"], _bounce);
  main.variable(observer("bounceOut")).define("bounceOut", ["md"], _bounceOut);
  main.variable(observer()).define(["chart","d3","invalidation"], _77);
  main.variable(observer("bounceInOut")).define("bounceInOut", ["md"], _bounceInOut);
  main.variable(observer()).define(["chart","d3","invalidation"], _79);
  main.variable(observer()).define(["md"], _80);
  main.variable(observer("chart")).define("chart", ["d3","width","height","x","margin","xAxis","IntersectionObserver"], _chart);
  main.variable(observer("x")).define("x", ["d3","margin","width"], _x);
  main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","x","width"], _xAxis);
  main.variable(observer("width")).define("width", _width);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
