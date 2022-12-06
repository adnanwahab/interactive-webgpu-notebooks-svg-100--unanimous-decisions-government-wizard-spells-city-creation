// https://observablehq.com/@j-f1/css-template-tag@148
function _1(md){return(
md`
# CSS template tag

> Show off the custom CSS applied to your notebook

---

### Usage

Expanded:
`
)}

function _2(css){return(
css`
blockquote {
  border-left: 1px solid currentColor;
  margin-left: 0;
  padding-left: 0.5em;
}
`
)}

function _3(md){return(
md`Collapsed:`
)}

function _4(collapsedCSS){return(
collapsedCSS('Your Label here')`
blockquote {
  border-left: 1px solid currentColor;
  margin-left: 0;
  padding-left: 0.5em;
}
`
)}

function _5(md){return(
md`Or:`
)}

function _6(collapsedCSS){return(
collapsedCSS`
blockquote {
  border-left: 1px solid currentColor;
  margin-left: 0;
  padding-left: 0.5em;
}
`
)}

function _7(md){return(
md`It also supports the \`viewof\` API, so if you’re creating a library that includes styles, you can use it like this:`
)}

function _style(css){return(
css`
blockquote {
  border-left: 1px solid currentColor;
  margin-left: 0;
  padding-left: 0.5em;
}
`
)}

function _9(style){return(
style
)}

function _10(md){return(
md`Finally, it supports transforming the CSS:`
)}

function _style2(css){return(
css({ transform: css => css.replace(/:scope/g, '.foo') })`
:scope h3 {
  font-size: 1.5em;
}
`
)}

function _12(style2){return(
style2.textContent
)}

function _style3(collapsedCSS){return(
collapsedCSS({
  transform: css => css.replace(/:scope/g, '.bar')
})`
:scope h3 {
  font-size: 1.5em;
}
`
)}

function _14(style3){return(
style3.textContent
)}

function _15(md){return(
md`
---

### Implementation
`
)}

function _css(tagWithOptions,interpolate,html,md){return(
tagWithOptions(({ transform }) => (...args) => {
  const source = interpolate(...args);
  const style = html`<style>`;
  style.textContent = transform ? transform(source) : source;
  const el = md`
~~~css
${source}
~~~
${style}
`;
  el.value = style.cloneNode(true);
  return el;
})
)}

function _collapsedCSS(tagWithOptions,css,html){return(
tagWithOptions(opts => (...args) => {
  if (typeof opts === 'string') {
    opts = { title: opts };
  }
  const content = css(opts)(...args);
  const el = html`
    <details>
      <summary style="cursor: pointer; user-select: none">${opts.title ||
        'CSS'}</summary>
      ${content}
    </details>
  `;
  el.value = content.value;
  return el;
})
)}

function _tagWithOptions(){return(
impl => (...args) => {
  if (!Array.isArray(args[0])) {
    return impl(args[0]);
  }
  return impl({})(...args);
}
)}

function _interpolate(dedent){return(
(strings, ...interpolations) => {
  let s = '';
  for (let i = 0; i < strings.length; i++) {
    s += strings[i];
    if (i < interpolations.length && interpolations[i]) {
      s += String(interpolations[i]);
    }
  }
  return dedent(s);
}
)}

function _20(md){return(
md`
---

### Dependencies
`
)}

async function _dedent(){return(
(await import('https://unpkg.com/dentist@1.0.3/src/index.js')).dedent
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["css"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["collapsedCSS"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["collapsedCSS"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("viewof style")).define("viewof style", ["css"], _style);
  main.variable(observer("style")).define("style", ["Generators", "viewof style"], (G, _) => G.input(_));
  main.variable(observer()).define(["style"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("viewof style2")).define("viewof style2", ["css"], _style2);
  main.variable(observer("style2")).define("style2", ["Generators", "viewof style2"], (G, _) => G.input(_));
  main.variable(observer()).define(["style2"], _12);
  main.variable(observer("viewof style3")).define("viewof style3", ["collapsedCSS"], _style3);
  main.variable(observer("style3")).define("style3", ["Generators", "viewof style3"], (G, _) => G.input(_));
  main.variable(observer()).define(["style3"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("css")).define("css", ["tagWithOptions","interpolate","html","md"], _css);
  main.variable(observer("collapsedCSS")).define("collapsedCSS", ["tagWithOptions","css","html"], _collapsedCSS);
  main.variable(observer("tagWithOptions")).define("tagWithOptions", _tagWithOptions);
  main.variable(observer("interpolate")).define("interpolate", ["dedent"], _interpolate);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("dedent")).define("dedent", _dedent);
  return main;
}
