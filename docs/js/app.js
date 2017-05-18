//Module

// see http://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
window.copyTextToClipboard = function(text) {
  var textArea = document.createElement("textarea");

  //
  // *** This styling is an extra step which is likely not required. ***
  //
  // Why is it here? To ensure:
  // 1. the element is able to have focus and selection.
  // 2. if element was to flash render it has minimal visual impact.
  // 3. less flakyness with selection and copying which **might** occur if
  //    the textarea element is not visible.
  //
  // The likelihood is the element won't even render, not even a flash,
  // so some of these are just precautions. However in IE the element
  // is visible whilst the popup box asking the user for permission for
  // the web page to copy to the clipboard.
  //

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent';
  textArea.value = text;
  document.body.appendChild(textArea);

  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }

  document.body.removeChild(textArea);
};


window.getParameterByName = function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

var app = angular.module('app', []);

app.directive("menu", function() {
         return {
            restrict : "A",
            templateUrl : "directives/menu.html"
         };
     });

app.directive("analytics", function() {
      return {
         restrict : "A",
         templateUrl : "directives/analytics.html"
      };
  });

app.directive("personalMsg", function() {
    return {
       restrict : "A",
       templateUrl : "directives/msg.html",
       link: function(scope, element, attrs) {
            scope.user = {name : ''};
            scope.medium = getParameterByName("utm_medium");
            scope.campaign = getParameterByName("utm_campaign");
            scope.source = getParameterByName("utm_source");
            console.log(scope.campaign + ' ' + scope.medium);
            scope.copy = function(lang) {
                var linkToCopy = 'https://devgadget.com/?utm_source=friends-of-friends' + lang;
                if (scope.user.name.trim()) {
                    linkToCopy += '&utm_campaign=' + encodeURI(scope.user.name.trim());
                }
                copyTextToClipboard(linkToCopy);
            };
       }
    };
});

 app.directive("defaultComponent", function($timeout) {
       return {
          restrict : "A",
          link: function(scope, element, attrs) {
          // see http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript


            value = window.getParameterByName('q');
            $timeout(function() {
                    if (value) {
                        element[0].value = value;
                    }
                    element[0].focus();
                }, 1);
          }
       };
   });

app.directive("defaultAction", function($interval) {
       return {
          restrict : "A",
          link: function(scope, element, attrs) {
            value = window.getParameterByName('q');
            if (!value) return;
            var counter = 0;
            promise = $interval( function(){
                counter++;
                if (counter === 20) {
                    $interval.cancel(promise);
                }
                var elements = document.querySelectorAll("[default-component]");
                if (elements && elements[0].value == value) {
                    $interval.cancel(promise);
                    element[0].click();
                }
            }, 200);
          }
       };
   });

app.directive("selectOnFocus", function($timeout) {
      return {
         restrict : "A",
         link: function(scope, element, attrs) {
            // see http://stackoverflow.com/questions/480735/select-all-contents-of-textbox-when-it-receives-focus-javascript-or-jquery
            $timeout(function() {
            $(element[0]).focus(function(){
                $(this).one('mouseup', function(event){
                    event.preventDefault();
                }).select();
            });
            }, 1);
        }
      }
});

app.directive("copyToClipboard", function($timeout) {
      return {
         restrict : "A",
         link: function(scope, element, attrs) {
            $(element[0]).click(function() {
                if (!document.getElementById('output')) return;
                var val = document.getElementById('output').value
                if (!val) return;
                window.copyTextToClipboard(val);
            });
        }
      }
});