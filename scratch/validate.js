const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, '../index.html');
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

const startTag = '<script type="text/plain" id="app-jsx">';
const endTag = '</script>';
const startIdx = indexHtml.indexOf(startTag);
if (startIdx === -1) {
    console.error('Error: Could not find start tag <script type="text/plain" id="app-jsx">');
    process.exit(1);
}
const contentStartIdx = startIdx + startTag.length;
const endIdx = indexHtml.indexOf(endTag, contentStartIdx);
if (endIdx === -1) {
    console.error('Error: Could not find end tag </script>');
    process.exit(1);
}

const jsxContent = indexHtml.substring(contentStartIdx, endIdx);
fs.writeFileSync(path.join(__dirname, 'temp_app.jsx'), jsxContent, 'utf8');
console.log('JSX content extracted successfully to scratch/temp_app.jsx. Length:', jsxContent.length);
