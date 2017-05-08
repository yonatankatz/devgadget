//Module
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