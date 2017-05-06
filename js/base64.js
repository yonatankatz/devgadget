var Base64 = {

	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	encode : function(input) {
		return btoa(input)
	},

	decode : function(input) {
		return atob(input)

	},




}

var encode = document.getElementById('encode'), decode = document
		.getElementById('decode'), output = document.getElementById('output'), input = document
		.getElementById('input');

encode.onclick = function() {
	$(document).ready(function() {
		output.innerHTML = Base64.encode(input.value);
	});
}

decode.onclick = function() {
	$(document).ready(function() {
		var $str = output.innerHTML;
		output.innerHTML = Base64.decode($str);
	});
}
