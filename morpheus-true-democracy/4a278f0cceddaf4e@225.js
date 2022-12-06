// https://observablehq.com/@bumbeishvili/comments-on-notebooks@225
import define1 from "./ba71f1bcb80e011e@346.js";

function _1(md){return(
md`# Comments on notebooks`
)}

function _3(md){return(
md`## Usage`
)}

function _4(md){return(
md`If we want to directly display comment section,we can just invoke comments function

It will take current url into account and will display comment section, with relevant comments to the notebook
`
)}

function _5(comments){return(
comments()
)}

function _6(md){return(
md`If we want comment visibility to be bound on buttons, we can pass true as a parameter and invoke it like that.

Clicking on comments button, will initialize comment panel`
)}

function _7(comments){return(
comments(true)
)}

function _8(md){return(
md`

---
## Implementation`
)}

function _disqussCodePart(width,html){return(
function (showButton) {

    function loadDisqus(){
    
       const elem =  document.querySelector('.disqus-button')
       if(elem){
           let thread = document.querySelector('.disqus-thread');
           if(thread){
              thread.parentNode.removeChild(thread);
           }
           elem.parentNode.removeChild(elem);
           document.querySelector('.disqus-container').innerHTML = `
              <div id="disqus_thread" style="width:${width}px;">
              </div>

              <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
           `
           
       }


         window.disqus_config = function () {
          this.page.url = document.referrer; 
          this.page.identifier = document.referrer; 
        };


        (function() {
          var d = document, s = d.createElement('script');
          s.src = 'https://observable-1.disqus.com/embed.js';
          s.setAttribute('data-timestamp', +new Date());
          (d.head || d.body).appendChild(s);
        })();
    
  }
  
  window.loadDisqus = loadDisqus;
  
  if(showButton){
    return html`
       <div class="disqus-container">
             <button 
                style="margin-top:30px;margin-bottom:30px;margin-left:${width/2-60}px;padding:20px;background-color:#215FE0;border-radius:4px; color:white;font-weight:bold;font-size:15px;cursor:pointer"
                class="disqus-button" onclick="loadDisqus()"> Comments </button>
        </div>
 `
  }else{
     loadDisqus();
    return   html`
        <div id="disqus_thread" class="disqus-thread" style="width:${width}px;">
        </div>

        <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
 `
   
  }
  
   
  

}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("comments", child1);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["comments"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["comments"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("disqussCodePart")).define("disqussCodePart", ["width","html"], _disqussCodePart);
  return main;
}
