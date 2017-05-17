var copyText = document.getElementById('copyText');
var link = document.getElementById('link');
var output = document.getElementById('output');
var input = document.getElementById('input');
var error = document.getElementById('errorMsg');

var initErrorMsg = function () {
   if (link.value) {
        error.innerHTML = '';
   }
};

window.onload = function () {

	if (link.addEventListener) {
		// event handling code for sane browsers
		link.addEventListener('input', initErrorMsg, false);
	}
	else if (link.attachEvent) {
		// IE-specific event handling code
		link.attachEvent('onpropertychange', initErrorMsg);
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

function generateLink()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 4; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var clipboardLink = localStorage.getItem("clipboardLink");
if (!clipboardLink) {
    clipboardLink = generateLink();
}

document.getElementById('baseLink').innerHTML = location.protocol + '//' + location.host + location.pathname + '?' + document.getElementById('baseLink').innerHTML;
link.value = link.value + clipboardLink;

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
    $('#loadingMode').removeClass('hide');
    var re = new RegExp(/bot|google|aolbuild|baidu|bing|msn|duckduckgo|teoma|slurp|yandex/, 'i');
    if (!re.test(navigator.userAgent)) {
        firebase.database().ref(formatToken(token)).once('value').then(function(storedValue) {
            $('#loadingMode').addClass('hide');
            if (!storedValue.val() || !storedValue.val().value) {
                $('#noDataFound').removeClass('hide');
                return;
            }
            output.innerHTML = (storedValue.val().value);
            $('#pasteMode').removeClass('hide');
        });
    }
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
     if(!$("#textCopingLoader").hasClass("hide")){
        $("#textCopingLoader").addClass("hide");
     }
    $('#textCopiedMsg').removeClass('hide');

}

function copyLink() {
    copyTextToClipboard(location.protocol + '//' + location.host + location.pathname + '?' + link.value);
}

copyText.onclick = function() {
        if (!input.value) return;
        if (!link.value) {
            error.innerHTML = 'Link token cannot be empty';
            return;
        }
         if(!$("#textCopiedMsg").hasClass("hide")){
            $("#textCopiedMsg").addClass("hide");
         }
        $('#textCopingLoader').removeClass('hide');

		var str = input.value;
		var token = link.value;
		localStorage.setItem("clipboardLink" , token);
		writeUserData(str, token);
};
