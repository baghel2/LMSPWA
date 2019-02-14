LMSApp.controller("EmployeeController",['$scope','EmployeeServices', function ($scope,EmployeeServices) {

    $scope.InitEmployee = function ()
    {
        $scope.Id           ='';
        $scope.FirstName     ='';
        $scope.LastName      ='';
        $scope.DateOfBirth   ='';
        $scope.Email         ='';
        $scope.Phone         ='';
        $scope.Designation   ='';
        $scope.Department    ='';
        $scope.JoiningDate   ='';
        $scope.Skills        ='';
        $scope.PresentAddress='';
        $scope.Area          ='';
        $scope.City          ='';
        $scope.Country = '';

        $scope.isSaved = false;

    }

    $scope.Add = function () {

        var EmployeeMDL = {
            
            Id           :     $scope.Id            ,
       FirstName     : $scope.FirstName     ,
       LastName      : $scope.LastName      ,
       DateOfBirth   : $scope.DateOfBirth   ,
       Email         : $scope.Email         ,
       Phone         : $scope.Phone         ,
       Designation   : $scope.Designation   ,
       Department    : $scope.Department    ,
       JoiningDate   : $scope.JoiningDate   ,
       Skills        : $scope.Skills        ,
       PresentAddress: $scope.PresentAddress,
       Area          : $scope.Area          ,
       City          : $scope.City          ,
       Country :  $scope.Country 


        };
        var requestResponse = EmployeeServices.Add(EmployeeMDL);

        requestResponse.then(function (response) {

            if (response.statusText = 'OK') {
                $scope.InitEmployee();
                $scope.msgHeader = 'Success';
                $scope.message = response.data;
                $scope.myDynamicClass = 'w3-panel w3-green w3-border';
                $scope.isSaved = true;
            }
            else {
                $scope.msgHeader = 'Failure';
                $scope.message = response.data;
                $scope.myDynamicClass = 'w3-panel w3-red w3-border';
                $scope.isSaved = true;
            }
        }, function (ex) {
            $scope.msgHeader = 'Error';
            $scope.message = response.ex;
            $scope.myDynamicClass = 'w3-panel w3-red w3-border';
            $scope.isSaved = true;
        })
    }

   
}]);
