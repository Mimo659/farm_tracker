const tailwindcss = require('tailwindcss');
const fs = require('fs');

fs.readFile('css/style.css', (err, css) => {
  tailwindcss.process(css, {
    from: 'css/style.css',
    to: 'css/output.css',
    plugins: [
      require('tailwindcss'),
      require('autoprefixer'),
    ],
  }).then(result => {
    fs.writeFile('css/output.css', result.css, () => true);
    if ( result.map ) {
      fs.writeFile('css/output.css.map', result.map.toString(), () => true);
    }
  });
});
