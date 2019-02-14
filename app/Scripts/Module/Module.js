var LMSApp = angular.module("LMSApp", ["ngRoute"]);

LMSApp.config(['$routeProvider', '$locationProvider',function ($routeProvider, $locationProvider) {

    $routeProvider
    //.when("/", {
    //    templateUrl: "index.html"
    //})
    .when("/list", {
        templateUrl: "app/LeaveList.html"
    })
    .when("/leavedetail", {
        templateUrl: "app/LeaveDetail.html",
        controller: "LeaveController"
    })
        .when("/employee", {
            templateUrl: "app/Employee.html",
            controller: "EmployeeController"
        })
    .otherwise({
        templateUrl: "app/Home.html"
    });
    $locationProvider.html5Mode(false).hashPrefix('!');
}]);
