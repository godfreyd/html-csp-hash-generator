# html-csp-hash-generator

Tool to generate hash for inline scripts and styles for CSP.

## Usage

```js
const { readFileSync } = require('fs');
const getCspHashes = require('html-csp-hash-generator');

const html = readFileSync('index.html', { encoding: 'utf8' });
const hashes = getCspHashes(html);

const staticPreset = {
    [csp.SCRIPT]: [cdnHost, ...hashes.scripts],
    [csp.STYLE]: [cdnHost, ...hashes.styles],
};
```

## Coverage

![coverage](./public/coverage.png)