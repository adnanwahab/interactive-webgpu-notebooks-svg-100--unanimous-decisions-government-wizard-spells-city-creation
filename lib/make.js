// convert to DENO in 2023
import { readFileSync } from 'node:fs';


file = `<ul class="">` +
JSON.parse(readFileSync('./table-of-contents.json')).contents.map(object => {
    return `<a href="${object.title}">${object.title}</a>`
})
+ `</ul>`


//table of contents =
//<headr>
//<ul>...
//<footer>
//people append their pages into table-of-contents.json and add folder
//run this script => output table-of-contents.html
//then join footer, header, into each observable page



//make pseudo-CMS out of observable by copy table-of-contents into ../index.html
//hire friend to add hierarchical chapters 


//how to have votes using observable notebook for github content pull requests -> just use +1 and tally them up automatically with a bot or count by "x% of community" = enough to amend content