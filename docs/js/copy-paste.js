var copyText = document.getElementById('copyText');
var outputLink = document.getElementById('outputLink');
var output = document.getElementById('output');
var input = document.getElementById('input');
var outputLinkDiv = document.getElementById('outputLinkDiv');

function makeToken()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 4; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var currentToken = makeToken();

var config = {
    apiKey: "AIzaSyA_KOm82nLzVd2S-8sXsj76APHvrBNevYk",
    authDomain: " devgadget-36dfb.firebaseapp.com",
    databaseURL: "https://devgadget-36dfb.firebaseio.com/",
    storageBucket: "copyPaste.appspot.com"
};

firebase.initializeApp(config);
var database = firebase.database();

var token = window.location.search.substr(1);
if (token) {
    firebase.database().ref(token).once('value').then(function(storedValue) {
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

function writeUserData(value) {
    firebase.database().ref(currentToken).set({
      token: currentToken,
      value: value,
    });
    return currentToken;
}

copyText.onclick = function() {
        if (!input.value) return;
		var str = input.value;
		var token = writeUserData(str);
		$('#outputLinkDiv').removeClass('hide');
		outputLink.value = location.protocol + '//' + location.host + location.pathname + '?' + token;
};
