LMSApp.service("EmployeeServices", function ($http) {
    var url = "http://localhost:17351/api/Employee/";
    var $this = this;
    $this.Add = function (EmployeeMDL) {
        var request = $http({
            method: 'POST',
            url: url+"Add",
            data: JSON.stringify(EmployeeMDL),
            dataType: "json"
        });
        return request;
      
    }

    $this.Delete = function (id) {
        var request = $http({
            method: 'POST',
            url: '/Home/DeleteLeave',
            data: "{ id:" + id + " }",
            dataType: "json"
        });
        return request;
    }

    $this.GetList = function () {
        var request = $http({
            method: 'GET',
            url: url +'GetList'
        });
        return request;
        debugger;
    }
    
    $this.GetLeave = function (id) {
        var Url = '/Home/GetLeave/'+id+'';
        var request = $http({
            method: 'GET',
            url: Url         
        });
        return request;
    }

    $this.Login = function (id, password) {
        var Url = '/Login/Index?id=' + id + '&paswword= ' + password + '';
        var request = $http({
            method: 'GET',
            url: Url
        });
        return request;
    }

});