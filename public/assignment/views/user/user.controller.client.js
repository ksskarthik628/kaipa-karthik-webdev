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
            user = UserService.findUserByCredentials(user.username, user.password);
            if (user) {
                $location.url("/user/" + user._id);
            } else {
                vm.alert = "Unable to find user";
            }
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
                    user = UserService.createUser(user);
                    if (user) {
                        $location.url("/user/" + user._id);
                    } else {
                        vm.alert = "Unable to create user";
                    }
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
        vm.clear = clear;

        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }
        init();

        function updateUser(user) {
            user = UserService.updateUser(vm.userId, user);
            if (user) {
                vm.success = "User updated";
            } else {
                vm.alert = "Unable to update user";
            }
        }
        
        function website() {
            $location.url("/user/" + vm.userId + "/website");
        }

        function logout() {
            $location.url("/login");
        }

        function clear() {
            vm.alert = "";
            vm.success = "";
        }
    }

})();