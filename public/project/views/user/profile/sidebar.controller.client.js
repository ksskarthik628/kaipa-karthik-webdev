(function () {
    
    angular
        .module('BBBApp')
        .controller('SidebarController', SidebarController);
    
    function SidebarController($stateParams, UserService) {

        var vm = this;
        vm.navUserId = $stateParams.userId;

        vm.follow = follow;
        vm.unfollow = unfollow;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;

                        isAlreadyFollowing();

                        UserService
                            .findUserById(vm.navUserId)
                            .then(function (response) {
                                var user = response.data;
                                if (user) {
                                    vm.navUser = user;
                                }
                            });
                    }
                });
        }
        init();

        function isAlreadyFollowing() {
            UserService
                .isFollowing(vm.user._id, vm.navUserId)
                .then(function (response) {
                    if (response.data) {
                        vm.alreadyFollowing = true;
                    }
                    else {
                        vm.alreadyFollowing = false;
                    }
                });
        }

        function follow(index) {
            var userId = vm.users[index]._id;
            UserService
                .follow(vm.user._id, userId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    vm.users[index].alreadyFollowing = true;
                }, function (err) {
                    console.log(err);
                    vm.users[index].alreadyFollowing = false;
                });
        }

        function unfollow(index) {
            var userId = vm.users[index]._id;
            UserService
                .unfollow(vm.user._id, userId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    vm.users[index].alreadyFollowing = false;
                }, function (err) {
                    console.log(err);
                    vm.users[index].alreadyFollowing = true;
                });
        }

    }
    
})();