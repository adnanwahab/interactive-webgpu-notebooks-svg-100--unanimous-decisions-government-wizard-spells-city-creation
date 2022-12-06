// https://observablehq.com/@bumbeishvili/group@295
import define1 from "./ba71f1bcb80e011e@346.js";

function _1(md){return(
md`# GroupBy we deserve 🦇`
)}

function _2(md){return(
md`When working inside js environment with data, I often find, that I need \`SQL\`'s \`group by\` like features`
)}

function _3(md){return(
md`**D3.nest** is great but it does not offer grouping by multiple key, which I  need many times`
)}

function _4(md){return(
md`**D3.group** is also great, but it is very much like d3.nest.

Also I think, it made more difficult working with data - because usual collection we are working with is array, and map right now most of the time requires converting to array (so, additional steps)`
)}

function _6(md){return(
md`Let's see what our group function can do

Load test **cars** data first`
)}

function _data(require){return(
require("@observablehq/cars")
)}

function _8(md){return(
md`## Group data by years`
)}

function _9(group,data){return(
group(data)
  .by(d=>d.Year)
  .run()
)}

function _10(md){return(
md`Notice automatic sorting by values length, descending`
)}

function _11(md){return(
md`## Group by year and horsepower`
)}

function _result(group,data){return(
group(data)
  .by(d=>d.Year,d=>d.Horsepower)
  .run()
)}

function _13(md){return(
md`## Group by year , horsepower and acceleration, order by acceleration `
)}

function _14(group,data){return(
group(data)
  .by(d=>d.Year,d=>d.Horsepower,d=>d.Acceleration)
  .orderBy(d=>d.keys[2])
  .run()
)}

function _15(md){return(
md`## Disable sorting`
)}

function _16(md){return(
md`Notice items are already sorted by values length 
(which is most of the time what we want), but if we want to disable it (In order to be faster)  `
)}

function _17(group,data){return(
group(data)
  .by(d=>d.Year)
  .sort(null)
  .run()
)}

function _18(md){return(
md`
## Sort (order by) ascending order

Way 1.`
)}

function _19(group,data){return(
group(data)
  .by(d=>d.Year)
  .sort((a,b)=>a.key>b.key?1:-1)
  .run()
)}

function _20(md){return(
md`Way 2. `
)}

function _21(group,data){return(
group(data)
  .by(d=>d.Year)
  .orderBy(d=>d.key)
  .run()
)}

function _22(md){return(
md`## Sort (order by) descending order`
)}

function _23(group,data){return(
group(data)
  .by(d=>d.Year)
  .orderByDescending(d=>d.key)
  .run()
)}

function _24(md){return(
md`## Aggregating things`
)}

function _25(md){return(
md`#### 1. Sum, average, max, min horsepower per year - native code`
)}

function _26(group,data){return(
group(data)
  .by(d=>d.Year)
  .orderBy(d=>d.key)
  .run() // This returns array
  .map(grouped=>{
     const horses = grouped.values.map(d=>d.Horsepower);
     const sum = horses.reduce((a,b)=>a+b);
     const avg = sum/grouped.values.length;
     const max = Math.max(...horses);
     const min = Math.min(...horses);
     return Object.assign(
       {min,max,sum,avg},
       grouped,
     )
  })
)}

function _27(md){return(
md`### Implementation`
)}

function _groupF()
{
    const groupByFunction = function(arr) {
        const operations = [];
        const initialData = arr;
        const resultObj = {};
        let resultArr;
        let sort = function(a, b) {
            return a.values.length < b.values.length ? 1 : -1
        }

        groupByFunction.by = function(groupFuncs) {
            const length = arguments.length;

            for (let j = 0; j < initialData.length; j++) {
                const dataObj = initialData[j];
                const keys = [];
                for (let i = 0; i < length; i++) {
                    const key = arguments[i];
                    keys.push(key(dataObj,j));
                }
                const strKey = JSON.stringify(keys);
                if (!resultObj[strKey]) {
                    resultObj[strKey] = [];
                }
                resultObj[strKey].push(dataObj)
            }
            operations.push('by')
            return groupByFunction;
        }

        groupByFunction.orderBy = function(func) {
            sort = function(a, b) {
                var a = func(a);
                var b = func(b);
                if (typeof a === 'string' || a instanceof String) {
                    return a.localeCompare(b);
                }
                return a - b;
            };
            operations.push('orderBy')
            return groupByFunction;
        }

        groupByFunction.orderByDescending = function(func) {
            sort = function(a, b) {
                var a = func(a);
                var b = func(b);
                if (typeof a === 'string' || a instanceof String) {
                    return a.localeCompare(b);
                }
                return b - a;
            };
            operations.push('orderByDescending')
            return groupByFunction;
        }

        groupByFunction.sort = function(v) {
            sort = v;
            operations.push('sort')
            return groupByFunction;
        }
        groupByFunction.run = function() {
            operations.forEach(operation=>{
              console.log(operation);
            })
            resultArr = Object
                .keys(resultObj)
                .map(k => {
                    const result = {}
                    const keys = JSON.parse(k);
                    if (keys.length == 1) {
                        result.key = keys[0];
                    } else {
                        result.keys = keys
                    }
                    result.values = resultObj[k]
                    return result;
                });
           
            if (sort) {
                resultArr.sort(sort);
            }
            return resultArr;
        }

        return groupByFunction;
    }

    return groupByFunction;
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  const child1 = runtime.module(define1);
  main.import("group", child1);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("data")).define("data", ["require"], _data);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["group","data"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("result")).define("result", ["group","data"], _result);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["group","data"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["group","data"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["group","data"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["group","data"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer()).define(["group","data"], _23);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer()).define(["group","data"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("groupF")).define("groupF", _groupF);
  return main;
}
