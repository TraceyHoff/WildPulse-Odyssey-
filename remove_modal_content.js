const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// In previous versions, modals just have their contents directly inside the modal div, without .modal-content
// Let's change <div id="tradeModal" class="modal">\n    <div class="modal-content"> ... </div></div>
// to <div id="tradeModal" style="display:none; position:absolute; color:white; z-index:700; text-align:center;"> ... </div>

html = html.replace('<div id="tradeModal" class="modal">\n    <div class="modal-content">',
                    '<div id="tradeModal" style="display:none; position:absolute; color:white; z-index:700; text-align:center;">');

html = html.replace('    <p id="tradeResult"></p>\n    </div>\n</div>',
                    '    <p id="tradeResult"></p>\n</div>');

fs.writeFileSync('index.html', html);
