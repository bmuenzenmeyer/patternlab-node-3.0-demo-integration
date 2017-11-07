/*
 This example shows arbitrary integration with a different process, in this case sass rendering.
 You could use similar logic to wrap Pattern Lab calls within a grunt or gulp task 
*/

// setup node-sass
const fs = require('fs');
const sass = require('node-sass');
const cssOutFile = './patternlab/css/style.css';

// setup pattern lab
const config = require('./patternlab-config.json');
const patternlab = require('@pattern-lab/patternlab-node')(config);

//render our sass
sass.render({
  file: './patternlab/css/style.scss',
  outFile: cssOutFile,
}, function(err, result) { 
  fs.writeFile(cssOutFile, result.css, function(err){
    if (err) {
      console.log(`ERROR: ${err}`);
    };

    //on successful sass rendering, rebuild pattern-lab
    patternlab.build(() => {
      // use the callback
    }, {
      cleanPublic: false
    }).then(() => {
      // or do something else when this promise resolves
    });
  });
});
