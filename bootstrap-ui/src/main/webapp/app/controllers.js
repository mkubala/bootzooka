
function UptimeCtrl($scope, UtilService) {
    $scope.uptime = UtilService.loadUptime();
}

function LogsCtrl($scope, LogService, LogCounterService) {

    var self = this;

    $scope.entryText = '';
    $scope.message = '';

    this.reloadEntries = function() {
        $scope.logs = LogService.query();
        $scope.size = LogCounterService.countLogs();
    }

    this.reloadEntries();


    $scope.addEntry = function() {
        LogService.addNew($scope.entryText, $scope.loggedUser.name, function() {
            self.reloadEntries();
            $scope.entryText = '';
            $scope.myForm.$pristine = true;
            showInfoMessage("Message posted");
        });
    };

    $scope.deleteEntry = function(logEntryId) {
        LogService.deleteEntry(logEntryId, function() {
            self.reloadEntries();
            showInfoMessage("Message removed");
        })
    };

    $scope.noEntries = function() {
        return 0 === $scope.size.value;
    };


    $scope.isOwnerOf = function(entry) {
        console.log(entry.text);
        console.log($scope.isLogged());
        console.log($scope.loggedUser);
        return $scope.isLogged() && entry.author === $scope.loggedUser.name;
    }
}


function LogEditCtrl($scope, LogService, $routeParams, $location) {

    $scope.logId = $routeParams.entryId;
    $scope.log = LogService.load($scope.logId);

    $scope.updateEntry = function() {
        LogService.update($scope.log);
        $location.path("");
    }

    $scope.isOwnerOfEntry = function() {
        var isOwner = $scope.log.author === $scope.loggedUser.name;
        return isOwner;
    }
}


function LoginCtrl($scope, UserService, $location) {

    var self = this;

    $scope.user = new Object();
    $scope.user.login = '';
    $scope.user.password = '';
    $scope.user.rememberme = false;

    $scope.login = function() {
        // set dirty to show error messages on empty fields when submit is clicked
        $scope.loginForm.login.$dirty = true;
        $scope.loginForm.password.$dirty = true;

        if($scope.loginForm.$invalid === false) {
            UserService.loginUser($scope.user, self.loginOk, self.loginFailed);
        }
    }


    this.loginOk = function(data) {
        $scope.logUser(data.value);
        $location.path("");
    }

    this.loginFailed = function(data) {
        showErrorMessage("Invalid login and/or password.")
    }
}
