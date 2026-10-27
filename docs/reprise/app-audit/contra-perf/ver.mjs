import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const b = await chromium.launch();
console.log(b.version());
await b.close();
