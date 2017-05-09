var formatJson = document.getElementById('formatJson');
var syntaxHighlightCheckbox = document.getElementById('syntaxHighlight')
var error = document.getElementById('errorMsg');
var output = document.getElementById('outputHighlighted');
var outputRegular = document.getElementById('outputRegular');
var input = document.getElementById('input');

// from http://stackoverflow.com/questions/4810841/how-can-i-pretty-print-json-using-javascript
function syntaxHighlight(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

formatJson.onclick = function() {
    var jsonStr = input.value || '';
    if (!jsonStr) {
        return;
    }
    outputRegular.innerHTML = '';
    output.innerHTML = '';
    error.innerHTML = '';
    var jsonObj;
    try {
        jsonObj = JSON.parse(jsonStr);
    }
    catch(err) {
        error.innerHTML = err.message;
        return;
    }

    var formattedJsonStr = JSON.stringify(jsonObj, null, 4);
    outputRegular.innerHTML = formattedJsonStr;
    output.style.display = syntaxHighlightCheckbox.checked? 'block' : 'none';
    outputRegular.style.display = syntaxHighlightCheckbox.checked? 'none' : 'block';
    if (syntaxHighlightCheckbox.checked) {
        formattedJsonStr = '<pre>' + syntaxHighlight(formattedJsonStr) + '</pre>';
    }
    output.innerHTML = formattedJsonStr;
    var newLinesCount = formattedJsonStr.split(/\r\n|\r|\n/).length;
    outputRegular.rows = formattedJsonStr.split(/\r\n|\r|\n/).length + 3;
}
