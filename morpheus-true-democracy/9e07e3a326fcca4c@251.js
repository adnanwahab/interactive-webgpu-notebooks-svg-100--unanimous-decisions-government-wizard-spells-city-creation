// https://observablehq.com/@bumbeishvili/persistent-select-input@251
import define1 from "./ba71f1bcb80e011e@346.js";

function _1(md){return(
md`# Persistent Select Input`
)}

function _2(md){return(
md`This notebook is an extension over [@jashkenas/inputs](https://observablehq.com/@jashkenas/inputs) select component`
)}

function _3(md){return(
md`In short, every time value is changed, it is saved in localStorage and after refresh, old value will be set as a default option


`
)}

function _4(md){return(
md`### Usage`
)}

function _6(md){return(
md`NOTE FOR SELF - fix default value setting when only string options are used`
)}

function _7(md){return(
md`You need to provide key for it, otherwise error will be thrown `
)}

function _d1Error(persistentSelect){return(
persistentSelect(["Spring", "Summer", "Fall", "Winter"])
)}

function _d2(persistentSelect){return(
persistentSelect(["Spring", "Summer", "Fall", "Winter"],'key1')
)}

function _10(d2){return(
d2
)}

function _dd2(persistentSelect){return(
persistentSelect({
  key:'3',
  description: "As a child, which vegetables did you refuse to eat?",
  options: ["Spinach", "Broccoli", "Brussels Sprouts", "Cauliflower", "Kale", "Turnips", "Green Beans", "Asparagus"],
  multiple: true
})
)}

function _12(dd2){return(
dd2
)}

function _dd3(persistentSelect)
{
  const dd3 = persistentSelect({
    title: "How are you feeling today?",
    key:13445,
    options: [
      { label: "🤷", value: "shrug" },
      { label: "😂", value: "tears-of-joy" },
      { label: "😍", value: "loving-it" },
      { label: "🤔", value: "hmmm" },
      { label: "😱", value: "yikes" },
      { label: "😈", value: "mischievous" },
      { label: "💩", value: "poo" }
    ],
    value: "hmmm"
  });
  dd3.input.style.fontSize = "30px";
  dd3.input.style.marginTop = "8px";
  return dd3;
}


function _14(dd3){return(
dd3
)}

function _15(md){return(
md`After refreshing notebook, chosen values will be preserved anyway`
)}

function _persistentSelectImpl(localStorage,input,html){return(
function persistentSelectImpl(config = {},newKey) {
   
  let {
    value: formValue,
    title,
    description,
    submit,
    multiple,
    size,
    key,
    options
  } = Array.isArray(config) ? {options: config} : config;

  
     if(!key && !newKey) {
        throw `Please provide unique key for select


persistentSelect({key:"uniqKey",options:[1,2]}) 
or
persistentSelect([1,2],"uniqKey")` 
   }else{
     if(newKey){
       key = newKey;
     }
   }
  
  const localValue = localStorage.getItem(key);

  if(localValue){
    formValue = JSON.parse(localValue);
  }
  
  let stringified = false;
  options = options.map(
    o => {
      if(typeof o === "object"){
        return o;
      }
      stringified = true;
      return  { value: JSON.stringify(o), label: o }
    }
  );
  

  
 // return key
  const form = input({
    type: "select",
    title,
    stringified,
    description,
    submit,
    getValue: input => {

      const selected = Array.prototype.filter
        .call(input.options, i => i.selected)
        .map(i => i.value);

      localStorage.setItem(key,JSON.stringify(selected))
      return multiple ? selected : selected[0];
    },
    form: html`
      <form>
        <select name="input" ${
          multiple ? `multiple size="${size || options.length}"` : ""
        }>
          ${options.map(({ value, label }) => Object.assign(html`<option>`, {
              value,
              selected: Array.isArray(formValue)
                ? formValue.includes(value)
                : formValue === value,
              textContent: label
            }))}
        </select>
      </form>
    `
  });
  form.output.remove();
  return form;
}
)}

function _input(html,d3format){return(
function input(config) {
  let {
    stringified,
    form,
    type = "text",
    attributes = {},
    action,
    getValue,
    title,
    description,
    format,
    display,
    submit,
    options
  } = config;
  const wrapper = html`<div></div>`;
  if (!form)
    form = html`<form>
	<input name=input type=${type} />
  </form>`;
  Object.keys(attributes).forEach(key => {
    const val = attributes[key];
    if (val != null) form.input.setAttribute(key, val);
  });
  if (submit)
    form.append(
      html`<input name=submit type=submit style="margin: 0 0.75em" value="${
        typeof submit == "string" ? submit : "Submit"
      }" />`
    );
  form.append(
    html`<output name=output style="font: 14px Menlo, Consolas, monospace; margin-left: 0.5em;"></output>`
  );
  if (title)
    form.prepend(
      html`<div style="font: 700 0.9rem sans-serif;">${title}</div>`
    );
  if (description)
    form.append(
      html`<div style="font-size: 0.85rem; font-style: italic;">${description}</div>`
    );
  if (format) format = typeof format === "function" ? format : d3format.format(format);
  if (action) {
    action(form);
  } else {
    const verb = submit
      ? "onsubmit"
      : type == "button"
      ? "onclick"
      : type == "checkbox" || type == "radio"
      ? "onchange"
      : "oninput";
    form[verb] = e => {

      e && e.preventDefault();
      let value = getValue ? getValue(form.input) : form.input.value;
      if(stringified){
         if(Array.isArray(value)){
            value.forEach(function(d,i,arr){
              arr[i] = JSON.parse(d);
            })
          }else{
            value = JSON.parse(value);
             }
          }

         
      if (form.output) {
        const out = display ? display(value) : format ? format(value) : value;
        if (out instanceof window.Element) {
          while (form.output.hasChildNodes()) {
            form.output.removeChild(form.output.lastChild);
          }
          form.output.append(out);
        } else {
          form.output.value = out;
        }
      }
      form.value = value;
      if (verb !== "oninput"){
         form.dispatchEvent(new CustomEvent("input", { bubbles: true }));
        
      }
       
    };
    if (verb !== "oninput")
      wrapper.oninput = e => e && e.stopPropagation() && e.preventDefault();
    if (verb !== "onsubmit") form.onsubmit = e => e && e.preventDefault();
    form[verb]();
  }
  while (form.childNodes.length) {
    wrapper.appendChild(form.childNodes[0]);
  }
  form.append(wrapper);
  return form;
}
)}

function _d3format(require){return(
require("d3-format@1")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  const child1 = runtime.module(define1);
  main.import("persistentSelect", child1);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("viewof d1Error")).define("viewof d1Error", ["persistentSelect"], _d1Error);
  main.variable(observer("d1Error")).define("d1Error", ["Generators", "viewof d1Error"], (G, _) => G.input(_));
  main.variable(observer("viewof d2")).define("viewof d2", ["persistentSelect"], _d2);
  main.variable(observer("d2")).define("d2", ["Generators", "viewof d2"], (G, _) => G.input(_));
  main.variable(observer()).define(["d2"], _10);
  main.variable(observer("viewof dd2")).define("viewof dd2", ["persistentSelect"], _dd2);
  main.variable(observer("dd2")).define("dd2", ["Generators", "viewof dd2"], (G, _) => G.input(_));
  main.variable(observer()).define(["dd2"], _12);
  main.variable(observer("viewof dd3")).define("viewof dd3", ["persistentSelect"], _dd3);
  main.variable(observer("dd3")).define("dd3", ["Generators", "viewof dd3"], (G, _) => G.input(_));
  main.variable(observer()).define(["dd3"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("persistentSelectImpl")).define("persistentSelectImpl", ["localStorage","input","html"], _persistentSelectImpl);
  main.variable(observer("input")).define("input", ["html","d3format"], _input);
  main.variable(observer("d3format")).define("d3format", ["require"], _d3format);
  return main;
}
