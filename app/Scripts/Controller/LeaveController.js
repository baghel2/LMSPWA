LMSApp.controller("LeaveController", ['$scope', 'LeaveServices', 'EmployeeServices', '$window', function ($scope, LeaveServices, EmployeeServices, $window) {

    $scope.isLogedIn = false;
    //$scope.display = false;

    $scope.init = function () {
        $scope.header = "Welcome to Leave Management System";

        $scope.isSaved = false;
        $scope.Id = 0;
        $scope.EmployeeId = 1;
        $scope.LeaveType = "";
        $scope.Status = "";
        $scope.LeaveFrom = "";
        $scope.LeaveTo = "";
        $scope.TotalDays = "";
        $scope.Comments = "";

        $scope.collapse = false;
    }

    $scope.GetLeaves = function (id) {
        $scope.tblShow = id;
        //var requestResponse = $scope.Employees.filter(function (items) { return items.Id == 1}).map(a=>a.LeaveDetails);// LeaveServices.GetList(id);
        //requestResponse.then(function (response) {
        //    $scope.leaves = response.data;
        //    $scope.collapse = true;
        //}, function (ex) {
        //    alert('Your request is not completed. Please try again after sometime.');
        //})

        $scope.collapse = true;
       // $scope.leaves = $scope.Employees.filter(function (items) { return items.Id == 1 }).map(a=>a.LeaveDetails);// LeaveServices.GetList(id);
    };

    $scope.orderByThis = function (data) {
        $scope.customOrderBy = data;
    }

    $scope.Add = function () {
        var date2 = new Date($scope.LeaveFrom);
        var date1 = new Date($scope.LeaveTo);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));

        var LeaveViewModel = {
            Id: 0,//$scope.Id,
            EmployeeId: 1,//$scope.EmployeeId,
            LeaveType: $scope.LeaveType,
            Status: 'P',//$scope.Status,
            LeaveFrom: $scope.LeaveFrom,
            LeaveTo: $scope.LeaveTo,
            TotalDays: dayDifference + 1,
            Comments: $scope.Comments
        };
        var requestResponse = LeaveServices.Add(LeaveViewModel);

        requestResponse.then(function (response) {

            if (response.statusText = 'OK') {
                $scope.init();
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

    function CleareScope() {
        $scope.Id = '';
        $scope.LeaveFrom = '';
        $scope.LeaveTo = '';
        $scope.Comments = '';
    }

    $scope.Create = function () {
        var LeavDetailMDL = {
            Id: $scope.Id,
            EmployeeId: ($scope.UserId == 0) ? 1 : $scope.UserId,
            LeaveType: "AL",
            Status: "Pending",
            LeaveTo: $scope.LeaveTo,
            LeaveFrome: $scope.LeaveFrom,
            TotalDays: 2,
            Comments: $scope.Comments
        };

        var requestResponse = LeaveServices.Create(LeavDetailMDL);
        Message(requestResponse);
        CleareScope();
        $scope.ShowAddNewPanel = false;
        $scope.DisableOnEdit = false;
    };

    $scope.editLeave = function (leave) {
        if (!$scope.ShowAddNewPanel)
            $scope.ShowAddNewPanel = true;

        $scope.DisableOnEdit = true;

        $scope.Id = leave.Id;
        $scope.UserId = leave.UserId;
        $scope.Login = leave.Login;

        var leaveFrom = new Date(parseInt(leave.LeaveFrom.substr(6)));
        var month = leaveFrom.getMonth() + 1;
        var day = leaveFrom.getDate();
        var year = leaveFrom.getFullYear();
        var dateFrom = day + "/" + month + "/" + year;
        $scope.LeaveFrom = dateFrom;

        var leaveUpto = new Date(parseInt(leave.LeaveTo.substr(6)));
        var month = leaveUpto.getMonth() + 1;
        var day = leaveUpto.getDate();
        var year = leaveUpto.getFullYear();
        var dateUpto = day + "/" + month + "/" + year;
        $scope.LeaveTo = dateUpto;

        $scope.Comments = leave.Comments;
    }



    $scope.DeleteLeave = function (id) {
        var requestResponse = LeaveServices.Delete(id);
        requestResponse.success(function (data) {
            $scope.Result = data;
        });

        var index = -1;
        var comArr = eval($scope.leaves);
        for (var i = 0; i < comArr.length; i++) {
            if (comArr[i].Id == id) {
                index = i;
                break;
            }
        }

        $scope.leaves.splice(index, 1);

        $scope.IsShowResult = true;
    };

    function Message(requestResponse) {
        requestResponse.then(function successCallback(response) {
            GetLeaves();
            $('#addEditLeave').modal('hide');
            // this callback will be called asynchronously
            // when the response is available
            $scope.Result = "Leave saved successfully.";
            $scope.IsShowResult = true;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert('error');
        });
    }

    function CheckIsValid() {
        var isValid = true;
        if ($('#email').val() === '' || $('#phone').val() === '' || $('#email').val() === '' || $('#phone').val() === '') {
            isValid = false;
        }
        return isValid;
    }

    $scope.GetEmployee = function () {
        $scope.header = "Employee Leave List";

        var ss = EmployeeServices.GetList();

        ss.then(function (response) {
            $scope.Employees = response.data;
        }, function (ex) {
            alert('Your request is not completed. Please try again after sometime.'+ex.statusText);
        })

        $scope.collapse = false;
        $scope.tblShow = false;
    }

    $scope.Login = function () {

        $scope.isLogedIn = true;
        $scope.display = false;
        document.getElementById('id01').style.display = 'none';
    }

}]);
