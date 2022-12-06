// https://observablehq.com/@bumbeishvili/data-driven-range-sliders@1588
import define1 from "./ba71f1bcb80e011e@346.js";

function _1(md,html){return(
md`# Data driven range sliders

${(navigator.userAgent.match('HeadlessChrome')) ? html`<img src="https://static.observableusercontent.com/thumbnail/a578557db9cf6c6689c756dd42172a43ad8d87b195c9589fcbe1e9a0cae9cdef.jpg">` : ''}

`
)}

function _2(md){return(
md`Github - https://github.com/bumbeishvili/data-driven-range-slider`
)}

function _3(md){return(
md`## Motivation`
)}

function _4(md){return(
md`I observed that, often I needed some kind of range filtering, which would be reflected by the data itself

So, I decided to go ahead and built reusable range slider, optimized for Observable usage

* It takes data, accessor and aggregator function
* Outputs filtered data and brushed ranges 

It makes easy to add data filter option to the charts   
(As seen in **More complex cases**) chapter

`
)}

function _5(md){return(
md`## Simplest usage`
)}

function _data(require){return(
require('@observablehq/alphabet')
)}

function _v(rangeSlider,data){return(
rangeSlider(data,  d=>d.frequency)
)}

function _9(md){return(
md`So, we pass data and accessor function (Which points to the numeric or date value )

Under the hood, range slider calculates extents and displays bars for each record at certain position on the **x axis** (and count on **y axis**),  brushing  yields data, which  falls between the brushed range`
)}

function _10(v){return(
v
)}

function _11(md){return(
md`Filtering happens over pregrouped values, so it's pretty fast`
)}

function _12(md){return(
md`## More complex cases`
)}

function _13(md){return(
md`Load cars data for convenience`
)}

function _cars(require){return(
require('@observablehq/cars')
)}

function _15(md){return(
md`#### Let's calculate car's count per year`
)}

function _c(rangeSlider,cars){return(
rangeSlider(cars,d=>d.Year)
)}

function _17(c){return(
c
)}

function _18(md){return(
md`#### Car's count by horsepower`
)}

function _d(rangeSlider,cars){return(
rangeSlider(cars,d=>d.Horsepower)
)}

function _20(d){return(
d
)}

function _21(md){return(
md`Although most crucial part here is brushing based on x axis, we also can control what we can show on y axis, by providing aggregator function

Keep in mind that, default aggregator is count
`
)}

function _22(md){return(
md`#### Average horsepower per year`
)}

function _e(rangeSlider,cars,d3){return(
rangeSlider(cars, d=>d.Year , group=>  d3.mean(group.values, d=>d.Horsepower) )
)}

function _24(e){return(
e
)}

function _25(md){return(
md` Looks like 1970 was the hub for horsepowers`
)}

function _26(md){return(
md`#### Max horsepower per year`
)}

function _f(rangeSlider,cars,d3){return(
rangeSlider(cars, d => d.Year, group => d3.max(group.values, d=>d.Horsepower) )
)}

function _28(f){return(
f
)}

function _29(md){return(
md`#### Min horsepower per year`
)}

function _g(rangeSlider,cars,d3){return(
rangeSlider(cars, d=>d.Year , group=>  d3.min(group.values, d=>d.Horsepower) )
)}

function _31(g){return(
g
)}

function _32(md){return(
md`### You can work with dates too`
)}

function _33(md){return(
md`You should provide date as an accessor`
)}

function _dateData(){return(
JSON.parse(`[{"amount":40,"date":"1 Jul 2018"},{"amount":400,"date":"1 Nov 2018"},{"amount":500,"date":"10 Dec 2018"},{"amount":9500,"date":"10 Jan 2019"},{"amount":200,"date":"11 Nov 2018"},{"amount":50,"date":"19 Nov 2018"},{"amount":450,"date":"19 Nov 2018"},{"amount":400,"date":"2 Oct 2018"},{"amount":100,"date":"20 Jan 2019"},{"amount":550,"date":"27 Sep 2018"},{"amount":100,"date":"3 Jan 2019"},{"amount":500,"date":"9 Nov 2018"}]`
)
.map(d=>Object.assign(d,{date:new Date(d.date)}))
)}

function _h(rangeSlider,dateData,d3){return(
rangeSlider(dateData, 
                         d=>d.date,
                         value=>d3.sum(value.values.map(d=>d.amount)) // We want sum of amount for range
                      )
)}

function _36(h){return(
h
)}

function _37(md){return(
md`### Control Y axis scale`
)}

function _38(md){return(
md`Let's make above example's y scale 'logarithmic like' , change height and ticks as well

Pay attention, that we pass configuration object
`
)}

function _i(rangeSlider,dateData,d3){return(
rangeSlider(dateData, 
                         d=>d.date,
                         value=>d3.sum(value.values.map(d=>d.amount)), 
                         {
                            height:300,
                            yTicks:15,
                            yScale:d3.scalePow().exponent(0.7)  // Domain and Range is automatically assigned
                         }  // passing parameters object
                      )
)}

function _40(i){return(
i
)}

function _41(md){return(
md`Other custom parameter examples 

`
)}

function _42(md){return(
md`#### Freeze Min
`
)}

function _a1(rangeSlider,cars){return(
rangeSlider(cars, d=>d.Horsepower ,{freezeMin:true} )
)}

function _44(a1){return(
a1
)}

function _45(md){return(
md`## Integrating it with your notebook`
)}

function _46(md){return(
md`Range slider has a mediator role, it takes your data, does the filtering and outputs filtered data, you can use filtered data in your notebook

That said, if your notebook had data defined in cell like this
\`\`\`js 
data = [{},....]
\`\`\`

Then you could inject range slider using following instructions:


**1.  Rename cell's name to dataInitial**
\`\`\`js 
dataInitial = [{},....]
\`\`\`

**gif**


![](https://user-images.githubusercontent.com/6873202/52085307-9d52b280-25bd-11e9-88f4-1617943ab605.gif)

**2. Import it**  

**gif**


![](https://user-images.githubusercontent.com/6873202/52085592-46011200-25be-11e9-9e4c-ed416096caa2.gif)

**3. Initialize range slider using dataInitial**
\`\`\`js 
viewof rangesliderdemo = rangeSlider(dataInitial, d=>d.accessorPropertyValue)
\`\`\`

**gif**


![](https://user-images.githubusercontent.com/6873202/52085820-e35c4600-25be-11e9-9edb-e790dd1cd015.gif)
**4. assign yelded data to the data cell**
\`\`\`js 
data = rangesliderdemo.data
\`\`\`

**gif**


![](https://user-images.githubusercontent.com/6873202/52085990-3cc47500-25bf-11e9-9e45-b4873733d7ff.gif)

`
)}

function _47(md){return(
md`#### In action

![](https://user-images.githubusercontent.com/6873202/52086150-92991d00-25bf-11e9-8376-3c1e7973db33.gif)


`
)}

function _48(html,comments){return(
html`
<div style="margin-top:100px;min-height:200px">
${comments(true)}
</div>
`
)}

function _49(md){return(
md`---

### Implementations`
)}

function _barRangeSlider(d3,width,DOM,group){return(
function barRangeSlider(
  initialDataArray,
  accessorFunction,
  aggregatorFunction,
  paramsObject
) {
  const initialData = initialDataArray;
  const accessor = accessorFunction;
  const aggregator = aggregatorFunction;
  const argumentsArr = [...arguments];
  let params = argumentsArr.filter(isPlainObj)[0];
  if (!params) {
    params = {};
  }

  let chartHeight = 100;
  let startSelection = 100;

  params.minY = params.yScale ? 0.0001 : 0;
  params.yScale = params.yScale || d3.scaleLinear();
  chartHeight = params.height || chartHeight;
  params.yTicks = params.yTicks || 4;
  params.freezeMin = params.freezeMin || false;

  const chartWidth = width - 40 - (params.marginRight || 0);

  var accessorFunc = (d) => d;
  if (initialData[0].value != null) {
    accessorFunc = (d) => d.value;
  }
  if (typeof accessor == "function") {
    accessorFunc = accessor;
  }
  const dataFinal = initialData; //
  const isDate =
    Object.prototype.toString.call(accessor(dataFinal[0])) === "[object Date]";
  var dateExtent, dateScale, scaleTime, dateRangesCount, dateRanges, scaleTime;
  if (isDate) {
    dateExtent = d3.extent(dataFinal.map(accessorFunc));
    dateRangesCount = Math.round(width / 5);
    dateScale = d3.scaleTime().domain(dateExtent).range([0, dateRangesCount]);
    scaleTime = d3.scaleTime().domain(dateExtent).range([0, chartWidth]);
    dateRanges = d3
      .range(dateRangesCount)
      .map((d) => [dateScale.invert(d), dateScale.invert(d + 1)]);
  }

  d3.selection.prototype.patternify = function (params) {
    var container = this;
    var selector = params.selector;
    var elementTag = params.tag;
    var data = params.data || [selector];

    // Pattern in action
    var selection = container.selectAll("." + selector).data(data, (d, i) => {
      if (typeof d === "object") {
        if (d.id) {
          return d.id;
        }
      }
      return i;
    });
    selection.exit().remove();
    selection = selection.enter().append(elementTag).merge(selection);
    selection.attr("class", selector);
    return selection;
  };

  const handlerWidth = 2,
    handlerFill = "#E1E1E3",
    middleHandlerWidth = 10,
    middleHandlerStroke = "#8E8E8E",
    middleHandlerFill = "#EFF4F7";

  const svg = d3
    .select(DOM.svg(chartWidth, chartHeight))
    .style("overflow", "visible");

  const chart = svg
    .append("g")
    .attr("transform", `translate(${params.marginLeft ?? 30},5)`);

  const groupedInitial = group(dataFinal)
    .by((d, i) => {
      const field = accessorFunc(d);
      if (isDate) {
        return Math.round(dateScale(field));
      }
      return field;
    })
    .orderBy((d) => d.key)
    .run();

  const grouped = groupedInitial.map((d) =>
    Object.assign(d, {
      value: typeof aggregator == "function" ? aggregator(d) : d.values.length
    })
  );

  const values = grouped.map((d) => d.value);
  const min = d3.min(values);
  const max = d3.max(values);
  const maxX = grouped[grouped.length - 1].key;
  const minX = grouped[0].key;

  var minDiff = d3.min(grouped, (d, i, arr) => {
    if (!i) return Infinity;
    return d.key - arr[i - 1].key;
  });

  let eachBarWidth = chartWidth / minDiff / (maxX - minX);

  if (eachBarWidth > 20) {
    eachBarWidth = 20;
  }

  if (minDiff < 1) {
    eachBarWidth = eachBarWidth * minDiff;
  }

  if (eachBarWidth < 1) {
    eachBarWidth = 1;
  }

  const scale = params.yScale
    .domain([params.minY, max])
    .range([0, chartHeight - 25]);
  const scaleY = scale
    .copy()
    .domain([max, params.minY])
    .range([0, chartHeight - 25]);

  const scaleX = d3.scaleLinear().domain([minX, maxX]).range([0, chartWidth]);
  var axis = d3.axisBottom(scaleX);
  if (isDate) {
    axis = d3.axisBottom(scaleTime);
  }
  const axisY = d3
    .axisLeft(scaleY)
    .tickSize(-chartWidth - 20)
    .ticks(max == 1 ? 1 : params.yTicks)
    .tickFormat(d3.format(".2s"));

  const bars = chart
    .selectAll(".bar")
    .data(grouped)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("width", eachBarWidth)
    .attr("height", (d) => scale(d.value))
    .attr("fill", "steelblue")
    .attr("y", (d) => -scale(d.value) + (chartHeight - 25))
    .attr("x", (d, i) => scaleX(d.key) - eachBarWidth / 2)
    .attr("opacity", 0.9);

  const xAxisWrapper = chart
    .append("g")
    .attr("transform", `translate(${0},${chartHeight - 25})`)
    .call(axis);

  const yAxisWrapper = chart
    .append("g")
    .attr("transform", `translate(${-10},${0})`)
    .call(axisY);

  const brush = chart
    .append("g")
    .attr("class", "brush")
    .call(
      d3
        .brushX()
        .extent([
          [0, 0],
          [chartWidth, chartHeight]
        ])
        .on("start", brushStarted)
        .on("end", brushEnded)
        .on("brush", brushed)
    );

  chart.selectAll(".selection").attr("fill-opacity", 0.1);

  var handle = brush
    .patternify({
      tag: "g",
      selector: "custom-handle",
      data: [
        {
          left: true
        },
        {
          left: false
        }
      ]
    })
    .attr("cursor", "ew-resize")
    .attr("pointer-events", "all");

  handle
    .patternify({
      tag: "rect",
      selector: "custom-handle-rect",
      data: (d) => [d]
    })
    .attr("width", handlerWidth)
    .attr("height", 100)
    .attr("fill", handlerFill)
    .attr("stroke", handlerFill)
    .attr("y", -50)
    .attr("pointer-events", "none");

  handle
    .patternify({
      tag: "rect",
      selector: "custom-handle-rect-middle",
      data: (d) => [d]
    })
    .attr("width", middleHandlerWidth)
    .attr("height", 30)
    .attr("fill", middleHandlerFill)
    .attr("stroke", middleHandlerStroke)
    .attr("y", -16)
    .attr("x", -middleHandlerWidth / 4)
    .attr("pointer-events", "none")
    .attr("rx", 3);

  handle
    .patternify({
      tag: "rect",
      selector: "custom-handle-rect-line-left",
      data: (d) => [d]
    })
    .attr("width", 0.7)
    .attr("height", 20)
    .attr("fill", middleHandlerStroke)
    .attr("stroke", middleHandlerStroke)
    .attr("y", -100 / 6 + 5)
    .attr("x", -middleHandlerWidth / 4 + 3)
    .attr("pointer-events", "none");

  handle
    .patternify({
      tag: "rect",
      selector: "custom-handle-rect-line-right",
      data: (d) => [d]
    })
    .attr("width", 0.7)
    .attr("height", 20)
    .attr("fill", middleHandlerStroke)
    .attr("stroke", middleHandlerStroke)
    .attr("y", -100 / 6 + 5)
    .attr("x", -middleHandlerWidth / 4 + middleHandlerWidth - 3)
    .attr("pointer-events", "none");

  handle.attr("display", "none");

  function brushStarted() {
    if (d3.event.selection) {
      startSelection = d3.event.selection[0];
    }
  }

  function brushEnded() {
    console.log("ended");
    if (!d3.event.selection) {
      handle.attr("display", "none");

      output({
        range: [minX, maxX]
      });
      return;
    }
    if (d3.event.sourceEvent.type === "brush") return;

    var d0 = d3.event.selection.map(scaleX.invert),
      d1 = d0.map(d3.timeDay.round);

    if (d1[0] >= d1[1]) {
      d1[0] = d3.timeDay.floor(d0[0]);
      d1[1] = d3.timeDay.offset(d1[0]);
    }
    console.log(d0, d1);
  }

  function brushed(d) {
    if (d3.event.sourceEvent.type === "brush") return;
    console.log("brushed", d3.event.selection);

    if (params.freezeMin) {
      if (d3.event.selection[0] < startSelection) {
        d3.event.selection[1] = Math.min(
          d3.event.selection[0],
          d3.event.selection[1]
        );
      }
      if (d3.event.selection[0] >= startSelection) {
        d3.event.selection[1] = Math.max(
          d3.event.selection[0],
          d3.event.selection[1]
        );
      }

      d3.event.selection[0] = 0;
      //    console.log(d3.event.selection)

      d3.select(this).call(d3.event.target.move, d3.event.selection);
    }

    var d0 = d3.event.selection.map(scaleX.invert);
    const s = d3.event.selection;
    console.log(s);

    handle.attr("display", null).attr("transform", function (d, i) {
      console.log(d);
      return "translate(" + (s[i] - 2) + "," + chartHeight / 2 + ")";
    });
    output({
      range: d0
    });
  }

  yAxisWrapper.selectAll(".domain").remove();
  xAxisWrapper.selectAll(".domain").attr("opacity", 0.1);

  chart.selectAll(".tick line").attr("opacity", 0.1);

  function isPlainObj(o) {
    return typeof o == "object" && o.constructor == Object;
  }

  function output(value) {
    const node = svg.node();
    node.value = value;
    node.value.data = getData(node.value.range);
    if (isDate) {
      node.value.range = value.range.map((d) => dateScale.invert(d));
    }
    node.dispatchEvent(new CustomEvent("input"));
  }

  function getData(range) {
    const dataBars = bars
      .attr("fill", "steelblue")
      .filter((d) => {
        return d.key >= range[0] && d.key <= range[1];
      })
      .attr("fill", "red")
      .nodes()
      .map((d) => d.__data__)
      .map((d) => d.values)
      .reduce((a, b) => a.concat(b), []);

    return dataBars;
  }

  const returnValue = Object.assign(svg.node(), {
    value: {
      range: [minX, maxX],
      data: initialData
    }
  });

  if (isDate) {
    returnValue.value.range = returnValue.value.range.map((d) =>
      dateScale.invert(d)
    );
  }

  return returnValue;
}
)}

function _51(md){return(
md`---`
)}

function _52(md){return(
md`---
## Libs`
)}

function _d3(require){return(
require('d3@v5')
)}

function _styles(html){return(
html`
${(!navigator.userAgent.match('HeadlessChrome')) ?html` 

styles
<style>
img{
box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);
}
</style>` : ''}
`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md","html"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  const child1 = runtime.module(define1);
  main.import("rangeSlider", child1);
  main.variable(observer("data")).define("data", ["require"], _data);
  main.variable(observer("viewof v")).define("viewof v", ["rangeSlider","data"], _v);
  main.variable(observer("v")).define("v", ["Generators", "viewof v"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["v"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("cars")).define("cars", ["require"], _cars);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("viewof c")).define("viewof c", ["rangeSlider","cars"], _c);
  main.variable(observer("c")).define("c", ["Generators", "viewof c"], (G, _) => G.input(_));
  main.variable(observer()).define(["c"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("viewof d")).define("viewof d", ["rangeSlider","cars"], _d);
  main.variable(observer("d")).define("d", ["Generators", "viewof d"], (G, _) => G.input(_));
  main.variable(observer()).define(["d"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("viewof e")).define("viewof e", ["rangeSlider","cars","d3"], _e);
  main.variable(observer("e")).define("e", ["Generators", "viewof e"], (G, _) => G.input(_));
  main.variable(observer()).define(["e"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("viewof f")).define("viewof f", ["rangeSlider","cars","d3"], _f);
  main.variable(observer("f")).define("f", ["Generators", "viewof f"], (G, _) => G.input(_));
  main.variable(observer()).define(["f"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("viewof g")).define("viewof g", ["rangeSlider","cars","d3"], _g);
  main.variable(observer("g")).define("g", ["Generators", "viewof g"], (G, _) => G.input(_));
  main.variable(observer()).define(["g"], _31);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("dateData")).define("dateData", _dateData);
  main.variable(observer("viewof h")).define("viewof h", ["rangeSlider","dateData","d3"], _h);
  main.variable(observer("h")).define("h", ["Generators", "viewof h"], (G, _) => G.input(_));
  main.variable(observer()).define(["h"], _36);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer("viewof i")).define("viewof i", ["rangeSlider","dateData","d3"], _i);
  main.variable(observer("i")).define("i", ["Generators", "viewof i"], (G, _) => G.input(_));
  main.variable(observer()).define(["i"], _40);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer("viewof a1")).define("viewof a1", ["rangeSlider","cars"], _a1);
  main.variable(observer("a1")).define("a1", ["Generators", "viewof a1"], (G, _) => G.input(_));
  main.variable(observer()).define(["a1"], _44);
  main.variable(observer()).define(["md"], _45);
  main.variable(observer()).define(["md"], _46);
  main.variable(observer()).define(["md"], _47);
  main.variable(observer()).define(["html","comments"], _48);
  main.variable(observer()).define(["md"], _49);
  main.variable(observer("barRangeSlider")).define("barRangeSlider", ["d3","width","DOM","group"], _barRangeSlider);
  main.variable(observer()).define(["md"], _51);
  main.variable(observer()).define(["md"], _52);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child2 = runtime.module(define1);
  main.import("group", child2);
  const child3 = runtime.module(define1);
  main.import("comments", child3);
  main.variable(observer("styles")).define("styles", ["html"], _styles);
  return main;
}
