// https://observablehq.com/@bumbeishvili/continent-selector@307
import define1 from "./ba71f1bcb80e011e@346.js";

function _1(md){return(
md`# Continent Selector`
)}

function _2(md){return(
md`## Usage`
)}

function _continent(continentSelector){return(
continentSelector()
)}

function _5(continent){return(
continent
)}

function _6(md){return(
md`# Options`
)}

function _7(md){return(
md`
\`\`\`javascript
let Options = {

   /* width of map, height automatically calculated */
   width:300,

   /* When hovered or clicked, those continents ignored */
   ignore:['Antarctica','Oceania']  ,

   /* initial stroke opacity of lands */
   strokeOpacity:1,

   /* Default land color */
   landColor:'gray',

   /* Default land fill opacity */
   fillOpacity:0.5,
}

// Options example
 createContinentSelector(options)
\`\`\`
   
`
)}

function _continent1(createContinentSelector){return(
createContinentSelector({
  width:600,
  ignore:['Antarctica','Oceania'],
  strokeOpacity:1,
  fillOpacity:0.5,
  landColor:'gray'
})
)}

function _9(continent1){return(
continent1
)}

function _10(md){return(
md`## Implementation`
)}

function _createContinentSelector(d3,DOM,land){return(
function(params) {
  
    const svgWidth = params&&params.width||300;
    const ignore = params&&params.ignore||[];
    const landColor =  params&&params.landColor||'#00E0FF'
    let strokeOpacity = params&&params.strokeOpacity||1;
    let fillOpacity = params&&params.fillOpacity||0.5

    if(params){
      if(!isNaN(params.strokeOpacity)){
         strokeOpacity = params.strokeOpacity
      }
    }

      
  
    const height = Math.round((210 / 400) * svgWidth);
    const svg = d3.select(DOM.svg(svgWidth, height))
    .on('click.reset',function(d,i,e,arr){
      console.log(d3.event.srcElement.tagName)
      if(d3.event.srcElement.tagName =='svg'){
        svg.selectAll('.land')
          .each(v => v.clicked = false)
          .attr('fill', landColor)
          .attr('fill-opacity',fillOpacity)
          .classed('selected', false)
        output('World')
      }
    })

    function output(value) {
        const node = svg.node();
        node.value = value;
        node.dispatchEvent(new CustomEvent('input'))
    }

    const projection = d3.geoNaturalEarth1()
        .fitSize([svgWidth, height], {
            type: "Sphere"
        });
    const graticule = d3.geoGraticule10();

    const path = d3.geoPath()
        .projection(projection)

    svg
        .selectAll('.graticule')
        .data([graticule])
        .join('path')
        .attr('class', 'graticule')
        .attr('d', path)
        .attr('stroke-width', 0.5*svgWidth/1000)
        .attr('fill', 'none')
        .attr('stroke', landColor)
        .attr('pointer-events','none')


    svg
        .selectAll('.land')
        .data(land.features)
        .join('path')
        .attr('class', 'land')
        .attr('d', path)
        .attr('fill', landColor)
        .attr('stroke', '#CCCCCC')
        .attr('stroke-width', 0.5)
        .attr('stroke-opacity',strokeOpacity)
        .attr('fill-opacity',fillOpacity)
        .on('mouseenter.continent', function(d) {
            if(ignore.includes(d.properties.CONTINENT)) return;
            d3.select(this).classed('hover', true).transition().attr('stroke-opacity',1).attr('stroke', '#FF0000').attr('stroke-width', 2)
        })
        .on('mouseleave.continent', function(d) {
            if(ignore.includes(d.properties.CONTINENT)) return;
            d3.select(this)
                .classed('hover', false)
                .transition()
                 .attr('stroke','#CCCCCC')
                 .attr('stroke-opacity',strokeOpacity)
                 .attr('stroke-width', 0.5)
        })
        .on('click.continent', function(d) {
            if(ignore.includes(d.properties.CONTINENT)) return;
            svg.selectAll('.land')
                .filter(v => v != d).each(v => v.clicked = false)
                .attr('fill', landColor)
                .attr('fill-opacity',fillOpacity)
                .classed('selected', false)
            d.clicked = !d.clicked;
            if (d.clicked) {
                output(d.properties.CONTINENT)
                d3.select(this).attr('fill','#FF0000').attr('fill-opacity',1).classed('selected', true)
            } else {
                d3.select(this).attr('fill', landColor).attr('fill-opacity',fillOpacity).classed('selected', true)
                output('World')
            }
        })
        .filter(d=>!ignore.includes(d.properties.CONTINENT))
         .attr('cursor','pointer')


    const returnValue = Object.assign(svg.node(), {
        value: "World"
    })

    return returnValue;
}
)}

function _land(topojson,landDownload){return(
topojson.feature(landDownload,landDownload.objects.continents)
)}

function _landDownload(d3){return(
d3.json('https://gist.githubusercontent.com/bumbeishvili/d2680078bb5232d11993d36030c5770c/raw/f19267222668edd504f739bb3c82c55f00283112/continents.json')
)}

function _topojson(require){return(
require('topojson')
)}

function _d3(require){return(
require('d3@v5')
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  const child1 = runtime.module(define1);
  main.import("continentSelector", child1);
  main.variable(observer("viewof continent")).define("viewof continent", ["continentSelector"], _continent);
  main.variable(observer("continent")).define("continent", ["Generators", "viewof continent"], (G, _) => G.input(_));
  main.variable(observer()).define(["continent"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("viewof continent1")).define("viewof continent1", ["createContinentSelector"], _continent1);
  main.variable(observer("continent1")).define("continent1", ["Generators", "viewof continent1"], (G, _) => G.input(_));
  main.variable(observer()).define(["continent1"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("createContinentSelector")).define("createContinentSelector", ["d3","DOM","land"], _createContinentSelector);
  main.variable(observer("land")).define("land", ["topojson","landDownload"], _land);
  main.variable(observer("landDownload")).define("landDownload", ["d3"], _landDownload);
  main.variable(observer("topojson")).define("topojson", ["require"], _topojson);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
