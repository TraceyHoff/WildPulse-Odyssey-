const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const DOMPurify = require('dompurify');

const html = fs.readFileSync('index.html', 'utf8');
const dom = new JSDOM(html);
const purify = DOMPurify(dom.window);

const dirty = '<span style="color:#f44336">Evil <script>alert("xss")</script> Name</span>';
const clean = purify.sanitize(dirty);
console.log("Dirty:", dirty);
console.log("Clean:", clean);
