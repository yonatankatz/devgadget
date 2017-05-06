//Module
var app = angular.module('app', []);

app.directive("menu", function() {
         return {
            restrict : "E",
            templateUrl : "directives/menu.html"
         };
     });