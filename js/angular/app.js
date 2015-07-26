/**
 * Created by hejchen on 7/23/2015.
 */
var app = angular.module("App", ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){

    $routeProvider
        .when('/', { templateUrl: 'views/welcome.html' })
        .when('/MovieList', { templateUrl: 'views/movieList.html' })
        .when('/MovieGallery', { templateUrl: 'views/movieGallery.html' })
        .otherwise({ redirectTo: '/' });

}]);