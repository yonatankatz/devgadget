var encode = document.getElementById('encode');
var output = document.getElementById('output');
var input = document.getElementById('input');

encode.onclick = function() {
		var str = input.value || '';
		str = encodeURI(str);
		output.value = str;
};
