// https://observablehq.com/@d3/radial-cluster@221
import define1 from "./6b2dbe02ff43d031@268.js";
import define2 from "./7a9e12f9fb3d8e06@459.js";

function _1(md){return(
md`# Tree, Radial Cluster

D3’s [cluster layout](https://github.com/d3/d3-hierarchy/blob/master/README.md#cluster) produces node-link diagrams with leaf nodes at equal depth. These are less compact than [tidy trees](/@d3/radial-tree), but are useful for dendrograms, hierarchical clustering and [phylogenetic trees](/@d3/tree-of-life). See also the [Cartesian variant](/@d3/cluster).`
)}

function _chart(Tree,flare,d3){return(
Tree(flare, {
  label: d => d.name,
  sort: (a, b) => d3.descending(a.height, b.height), // reduce link crossings
  tree: d3.cluster,
  title: (d, n) => `${n.ancestors().reverse().map(d => d.data.name).join(".")}`, // hover text
  link: (d, n) => n.children
    ? `https://github.com/prefuse/Flare/tree/master/flare/src/${n.ancestors().reverse().map(d => d.data.name).join("/")}`
    : `https://github.com/prefuse/Flare/blob/master/flare/src/${n.ancestors().reverse().map(d => d.data.name).join("/")}.as`,
  width: 1152,
  height: 1152,
  margin: 110
})
)}

function _flare(FileAttachment){return(
FileAttachment("flare-2.json").json()
)}

function _4(howto){return(
howto("Tree", "@d3/radial-tree")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["flare-2.json", {url: new URL("./files/e65374209781891f37dea1e7a6e1c5e020a3009b8aedf113b4c80942018887a1176ad4945cf14444603ff91d3da371b3b0d72419fa8d2ee0f6e815732475d5de.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("chart")).define("chart", ["Tree","flare","d3"], _chart);
  main.variable(observer("flare")).define("flare", ["FileAttachment"], _flare);
  main.variable(observer()).define(["howto"], _4);
  const child1 = runtime.module(define1);
  main.import("Tree", child1);
  const child2 = runtime.module(define2);
  main.import("howto", child2);
  return main;
}
