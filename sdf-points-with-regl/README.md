# SDF Points with regl

https://observablehq.com/@rreusser/sdf-points-with-regl@720

View this notebook in your browser by running a web server in this folder. For
example:

~~~sh
npx http-server
~~~

Or, use the [Observable Runtime](https://github.com/observablehq/runtime) to
import this module directly into your application. To npm install:

~~~sh
npm install @observablehq/runtime@5
npm install https://api.observablehq.com/@rreusser/sdf-points-with-regl@720.tgz?v=3
~~~

Then, import your notebook and the runtime as:

~~~js
import {Runtime, Inspector} from "@observablehq/runtime";
import define from "@rreusser/sdf-points-with-regl";
~~~

To log the value of the cell named “foo”:

~~~js
const runtime = new Runtime();
const main = runtime.module(define);
main.value("foo").then(value => console.log(value));
~~~

interaction modes :

sidescrolling
https://pudding.cool/2022/12/emotion-wheel/

copy pudding.cool, distil.pub, bv, NYT,  threedee css transforms to flip pages so its like a story book

down-scrolling + two column layout + both + 


