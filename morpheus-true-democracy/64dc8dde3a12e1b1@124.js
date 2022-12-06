// https://observablehq.com/@bumbeishvili/wrangle@124
import define1 from "./ba71f1bcb80e011e@346.js";

function _1(md){return(
md`# Wrangle`
)}

function _2(md){return(
md`Sometimes we have tabular data and we want to make sense of it before we start making  visualizations`
)}

function _3(md){return(
md`We can use single function for that`
)}

function _5(md){return(
md`It automatically loops over keys , groups and sorts data based on values and includes some statistics for each groups`
)}

function _6(md){return(
md` Cars`
)}

function _cars(require){return(
require('@observablehq/cars')
)}

function _8(wrangle,cars){return(
wrangle(cars)
)}

function _9(md){return(
md`Diamonds`
)}

function _diamonds(require){return(
require('@observablehq/diamonds')
)}

function _11(wrangle,diamonds){return(
wrangle(diamonds)
)}

function _12(md){return(
md`Iris`
)}

function _iris(require){return(
require('@observablehq/iris')
)}

function _14(wrangle,iris){return(
wrangle(iris)
)}

function _15(md){return(
md`Population`
)}

function _population(require){return(
require('@observablehq/population')
)}

function _17(wrangle,population){return(
wrangle(population)
)}

function _18(md){return(
md`# Libs and implementation`
)}

function _wrangleF(group,d3){return(
function wrangleF(data, disableAggr) {
  return Object.keys(data[0]).map((k) => {
    const grouped = group(data)
      .by((d) => d[k])
      .run()
      .map((d) => {
        const keys = Object.keys(data[0]);

        if (disableAggr) {
          return d;
        }

        let aggr = new Map(
          Object.keys(data[0]).map((k) => [
            k,
            {
              min: d3.min(d.values, (v) => v[k]),
              max: d3.max(d.values, (v) => v[k]),
              mean: d3.mean(d.values, (v) => v[k]),
              count: d.values.length,
              sum: d3.sum(d.values, (v) => v[k]),
              median: d3.median(d.values, (v) => v[k]),
              cumsum: d3.cumsum(d.values, (v) => v[k]),
              deviation: d3.deviation(d.values, (v) => v[k])
            }
          ])
        );
        return Object.assign(d, {
          aggr: aggr
        });
      });

    if (disableAggr) {
      return {
        key: k,
        group: grouped
      };
    }

    const aggr = {
      min: d3.min(data, (v) => v[k]),
      max: d3.max(data, (v) => v[k]),
      mean: d3.mean(data, (v) => v[k]),
      distinctCount: grouped.length,
      sum: d3.sum(data, (v) => v[k]),
      median: d3.median(data, (v) => v[k]),
      cumsum: d3.cumsum(data, (v) => v[k]),
      deviation: d3.deviation(data, (v) => v[k])
    };

    return {
      key: k,
      group: grouped,
      aggr
    };
  });
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  const child1 = runtime.module(define1);
  main.import("wrangle", child1);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("cars")).define("cars", ["require"], _cars);
  main.variable(observer()).define(["wrangle","cars"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("diamonds")).define("diamonds", ["require"], _diamonds);
  main.variable(observer()).define(["wrangle","diamonds"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("iris")).define("iris", ["require"], _iris);
  main.variable(observer()).define(["wrangle","iris"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("population")).define("population", ["require"], _population);
  main.variable(observer()).define(["wrangle","population"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("wrangleF")).define("wrangleF", ["group","d3"], _wrangleF);
  const child2 = runtime.module(define1);
  main.import("group", child2);
  return main;
}
