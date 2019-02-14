LMSApp.service("LeaveServices", function ($http) {
    var apiurl = '';
     apiurl = "http://localhost:17351/api/Leave/";
    var $this = this;

    $this.Add = function (user) {

        var request = $http({
            method: 'POST',
            url: apiurl + "Add",
            data: JSON.stringify(user),
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

    $this.GetList = function (id) {
        var request = $http({
            method: 'GET',
            url: apiurl + 'GetList?id=' + id
        });
        return request;
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