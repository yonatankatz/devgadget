
var input = document.getElementById("input");
var sha1_output = document.getElementById('sha1_output');
var sha256_output = document.getElementById('sha256_output');
var sha384_output = document.getElementById('sha384_output');
var sha512_output = document.getElementById('sha512_output');

window.onload = function () {

	if (input.addEventListener) {
		// event handling code for sane browsers
		input.addEventListener('input', computeHashValues, false);
	}
	else if (input.attachEvent) {
		// IE-specific event handling code
		input.attachEvent('onpropertychange', computeHashValues);
	}
	computeHashValues();
};

var computeHashValues = function() {
	var buffer = new TextEncoder("utf-8").encode(input.value);

	crypto.subtle.digest("SHA-1", buffer).then(function (hash) {
		sha1_output.value = hex(hash);
  	});

	crypto.subtle.digest("SHA-256", buffer).then(function (hash) {
	    sha256_output.value = hex(hash);
  	});

  	crypto.subtle.digest("SHA-384", buffer).then(function (hash) {
		sha384_output.value = hex(hash);
  	});
  	crypto.subtle.digest("SHA-512", buffer).then(function (hash) {
		sha512_output.value = hex(hash);
  	});
}

//taken from https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#Specifications
var hex = function (buffer) {
  var hexCodes = [];
  var view = new DataView(buffer);
  for (var i = 0; i < view.byteLength; i += 4) {
    // Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
    var value = view.getUint32(i)
    // toString(16) will give the hex representation of the number without padding
    var stringValue = value.toString(16)
    // We use concatenation and slice for padding
    var padding = '00000000'
    var paddedValue = (padding + stringValue).slice(-padding.length)
    hexCodes.push(paddedValue);
  }

  // Join all the hex strings into one
  return hexCodes.join("");
}


