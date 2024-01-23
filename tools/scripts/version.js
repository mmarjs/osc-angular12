const fs = require('fs');

const packageJson = fs.readFileSync('package.json', {
  encoding: 'utf8'
});

const version = JSON.parse(packageJson)['version'];

fs.writeFileSync('./libs/layout/assets/VERSION', version);
