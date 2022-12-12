# 2D (Non-physical) N-body Gravity with Poisson's Equation

https://observablehq.com/@rreusser/2d-n-body-gravity-with-poissons-equation@2888

View this notebook in your browser by running a web server in this folder. For
example:

~~~sh
npx http-server
~~~

Or, use the [Observable Runtime](https://github.com/observablehq/runtime) to
import this module directly into your application. To npm install:

~~~sh
npm install @observablehq/runtime@5
npm install https://api.observablehq.com/@rreusser/2d-n-body-gravity-with-poissons-equation@2888.tgz?v=3
~~~

Then, import your notebook and the runtime as:

~~~js
import {Runtime, Inspector} from "@observablehq/runtime";
import define from "@rreusser/2d-n-body-gravity-with-poissons-equation";
~~~

To log the value of the cell named “foo”:

~~~js
const runtime = new Runtime();
const main = runtime.module(define);
main.value("foo").then(value => console.log(value));
~~~
