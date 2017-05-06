//Module
var app = angular.module('app', []);

app.directive("menu", function() {
         return {
            restrict : "A",
            templateUrl : "directives/menu.html"
         };
     });