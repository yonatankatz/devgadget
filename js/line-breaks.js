var removeLines = document.getElementById('removeLineBreaks')
var reduceWS = document.getElementById('reduceWhitespaces')
var output = document.getElementById('output')
var input = document.getElementById('input');

removeLines.onclick = function() {
		var str = input.value || '';
		if (reduceWS.checked) {
		    str = str.replace(/\s+/g, ' ').trim();
		} else {
		    str = str.replace(/(\r\n|\n|\r)/gm, '');
		}
		output.innerHTML = str;
}
