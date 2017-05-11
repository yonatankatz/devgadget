var escapeJson = document.getElementById('escapeJson');
var escapeXml = document.getElementById('escapeXml');
var escapeHtml = document.getElementById('escapeHtml');
var output = document.getElementById('output');
var input = document.getElementById('input');

escapeJson.onclick = function() {
		var str = input.value || '';
		str = str
            .replace(/[\\]/g, '\\\\')
            .replace(/[\"]/g, '\\\"')
            .replace(/[\/]/g, '\\/')
            .replace(/[\b]/g, '\\b')
            .replace(/[\f]/g, '\\f')
            .replace(/[\n]/g, '\\n')
            .replace(/[\r]/g, '\\r')
            .replace(/[\t]/g, '\\t');
        $(output).val(str);
};

escapeXml.onclick = function() {
		var str = input.value || '';
        str = str.replace(/[<>&'"]/g, function (c) {
            switch (c) {
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '&': return '&amp;';
                case '\'': return '&apos;';
                case '"': return '&quot;';
            }
        });
        $(output).val(str);
};

escapeHtml.onclick = function() {
    var str = input.value || '';
    var text = document.createTextNode(str);
    var div = document.createElement('div');
    div.appendChild(text);
    $(output).val($(div).html());
};



