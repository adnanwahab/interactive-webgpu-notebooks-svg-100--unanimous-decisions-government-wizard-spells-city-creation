// https://observablehq.com/@observablehq/dot@135
function _1(md){return(
md`# Graphviz

The **dot** template literal, part of the [Observable standard library](/@observablehq/recommended-libraries), allows the use of the [Graphviz](http://www.graphviz.org/) language to render graphs. Observable’s implementation is provided by [Viz.js](https://github.com/mdaines/viz.js/), an Emscripten port. See also the [**mermaid** template literal](/@observablehq/mermaid) for Mermaid.`
)}

function _2(dot){return(
dot`digraph { a -> b; }`
)}

function _3(dot){return(
dot`graph { n0 -- n1 -- n2 -- n3 -- n0; }`
)}

function _4(dot){return(
dot`digraph { x -> y -> z; }`
)}

function _5(dot){return(
dot`
digraph G {
  subgraph cluster_0 {
    style=filled;
    color=lightgrey;
    node [style=filled,color=white];
    a0 -> a1 -> a2 -> a3;
    label = "process #1";
  }
  subgraph cluster_1 {
    node [style=filled];
    b0 -> b1 -> b2 -> b3;
    label = "process #2";
    color=blue
  }
  start -> a0;
  start -> b0;
  a1 -> b3;
  b2 -> a3;
  a3 -> a0;
  a3 -> end;
  b3 -> end;
  start [shape=Mdiamond];
  end [shape=Msquare];
}
`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["dot"], _2);
  main.variable(observer()).define(["dot"], _3);
  main.variable(observer()).define(["dot"], _4);
  main.variable(observer()).define(["dot"], _5);
  return main;
}
