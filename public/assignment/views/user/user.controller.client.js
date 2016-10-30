(function () {
    angular
        .module('WebAppMaker')
        .controller('LoginController', LoginController)
        .controller('RegisterController', RegisterController)
        .controller('ProfileController', ProfileController);
    
    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;
        vm.register = register;
        vm.clear = clear;

        function login(user) {
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(function (response) {
                    var user = response.data;
                    $location.url("/user/" + user._id);
                }, function (error) {
                    vm.alert = "Unable to find user";
                });
        }

        function register() {
            $location.url("/register");
        }

        function clear() {
            vm.alert = "";
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;
        vm.cancel = cancel;
        vm.clear = clear;

        function register(user) {
            if (user.username) {
                if (user.password === user.verifyPassword) {
                    UserService
                        .createUser(user)
                        .then(function (response) {
                            var user = response.data;
                            $location.url("/user/" + user._id);
                        }, function (error) {
                            vm.alert = "Unable to create user";
                        });
                } else {
                    vm.alert = "Make sure passwords match";
                }
            } else {
                vm.alert = "Please enter valid username";
            }
        }

        function cancel() {
            $location.url("/login");
        }

        function clear() {
            vm.alert = "";
        }
    }

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.updateUser = updateUser;
        vm.website = website;
        vm.logout = logout;
        vm.deleteAccount = deleteAccount;
        vm.clear = clear;

        function init() {
            UserService
                .findUserById(vm.userId)
                .then(function (response) {
                    vm.user = response.data;
                }, function (error) {
                    vm.alert = "Unable to find user";
                });
        }
        init();

        function updateUser(user) {
            UserService
                .updateUser(vm.userId, user)
                .then(function (response) {
                    vm.success = "User updated";
                }, function (error) {
                    vm.alert = "Unable to update user";
                });
        }
        
        function website() {
            $location.url("/user/" + vm.userId + "/website");
        }

        function logout() {
            $location.url("/login");
        }

        function deleteAccount() {
            UserService
                .deleteUser(vm.userId)
                .then(function (response) {
                    $location.url("/login");
                }, function (error) {
                    vm.alert = "Unable to delete account";
                });
        }

        function clear() {
            vm.alert = "";
            vm.success = "";
        }
    }

})();