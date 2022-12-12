function _1(md){return(
md`# D3 Scatterplot

A good starting point for many two-dimensional charts with x and y axes.`
)}

function _chart(d3,width,height,xAxis,yAxis,data,x,y)
{
  const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);

  svg.append("g").call(xAxis);

  svg.append("g").call(yAxis);

  svg
    .append("g")
    .selectAll("circle")
    .data(data)
    .join("circle")
    .filter((d) => d.body_mass_g)
    .attr("cx", (d) => x(d.flipper_length_mm))
    .attr("cy", (d) => y(d.body_mass_g))
    .attr("r", 4);

  svg.append("path").attr("d", "M-0,0,0,500,500,0").attr("fill", "red");
  svg.on("mousemove", (e) => console.log(e.target));

  return svg.node();
}


function _data(FileAttachment){return(
FileAttachment("penguins.csv").csv({typed: true})
)}

function _height(){return(
400
)}

function _x(d3,data,margin,width){return(
d3.scaleLinear()
    .domain(d3.extent(data, d => d.flipper_length_mm)).nice()
    .range([margin.left, width - margin.right])
)}

function _y(d3,data,height,margin){return(
d3.scaleLinear()
    .domain(d3.extent(data, d => d.body_mass_g)).nice()
    .range([height - margin.bottom, margin.top])
)}

function _xAxis(height,margin,d3,x){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x))
)}

function _yAxis(margin,d3,y){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
)}

function _margin(){return(
{top: 25, right: 20, bottom: 35, left: 40}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["penguins.csv", {url: new URL("./files/715db1223e067f00500780077febc6cebbdd90c151d3d78317c802732252052ab0e367039872ab9c77d6ef99e5f55a0724b35ddc898a1c99cb14c31a379af80a.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("chart")).define("chart", ["d3","width","height","xAxis","yAxis","data","x","y"], _chart);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("x")).define("x", ["d3","data","margin","width"], _x);
  main.variable(observer("y")).define("y", ["d3","data","height","margin"], _y);
  main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","x"], _xAxis);
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3","y"], _yAxis);
  main.variable(observer("margin")).define("margin", _margin);
  return main;
}
