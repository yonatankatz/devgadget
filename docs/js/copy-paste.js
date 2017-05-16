var copyText = document.getElementById('copyText');
var outputLink = document.getElementById('outputLink');
var output = document.getElementById('output');
var input = document.getElementById('input');
var error = document.getElementById('errorMsg');

var initErrorMsg = function () {
   if (outputLink.value) {
        error.innerHTML = '';
   }
};

window.onload = function () {

	if (outputLink.addEventListener) {
		// event handling code for sane browsers
		outputLink.addEventListener('input', initErrorMsg, false);
	}
	else if (input.attachEvent) {
		// IE-specific event handling code
		input.attachEvent('onpropertychange', initErrorMsg);
	}
};


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function formatToken(token) {
    return token.replaceAll('.', '-')
                .replaceAll('#', '-')
                .replaceAll('[', '-')
                .replaceAll(']', '-')
                .replaceAll('%', '-');
}

function makeToken()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 4; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var currentToken = localStorage.getItem("copyPasteToken");
if (!currentToken) {
    currentToken = makeToken();
}

document.getElementById('baseLink').innerHTML = location.protocol + '//' + location.host + location.pathname + '?' ;
outputLink.value = currentToken;

var config = {
    apiKey: "AIzaSyA_KOm82nLzVd2S-8sXsj76APHvrBNevYk",
    authDomain: "devgadget-36dfb.firebaseapp.com",
    databaseURL: "https://devgadget-36dfb.firebaseio.com/",
    storageBucket: "copyPaste.appspot.com"
};

firebase.initializeApp(config);
var database = firebase.database();

var token = window.location.search.substr(1);
if (token) {
    firebase.database().ref(formatToken(token)).once('value').then(function(storedValue) {
        if (!storedValue.val() || !storedValue.val().value) {
            console.log('no value found for token ' + token);
            return;
        }
        output.innerHTML = (storedValue.val().value);
        $('#pasteMode').removeClass('hide');
    });
}
else {
    $('#copyMode').removeClass('hide');
}

function writeUserData(value, token) {
    firebase.database().ref(formatToken(token)).set({
      token: token,
      value: value,
      time: new Date().toString()
    });
}

copyText.onclick = function() {
        if (!input.value) return;
        if (!outputLink.value) {
            error.innerHTML = 'Link token cannot be empty';
            return;
        }
		var str = input.value;
		var token = outputLink.value;
		localStorage.setItem("copyPasteToken" , token);
		writeUserData(str, token);
		$('#textCopiedMsg').removeClass('hide');
};
