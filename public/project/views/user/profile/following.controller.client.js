(function () {

    angular
        .module('BBBApp')
        .controller('FollowingController', FollowingController);

    function FollowingController($q, $stateParams, UserService) {

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
                        return UserService.findAllFollowingUsers(vm.navUserId);
                    }
                })
                .then(function (response) {
                    var users = response.data;
                    if (users) {

                        isAlreadyFollowing(users);

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

        function isAlreadyFollowing(users) {
            var promiseArray = [];
            var result = [];

            users.forEach(function (element, index, array) {
                promiseArray
                    .push(
                        UserService
                            .isAlreadyFollowing(vm.user._id, element._id)
                            .then(
                                function (response) {
                                    var user = element;

                                    if (user._id != vm.user._id) {
                                        if (response.data) {
                                            user.alreadyFollowing = true;
                                        }
                                        else {
                                            user.alreadyFollowing = false;
                                        }
                                    }
                                    else {
                                        user.itsMe = true;
                                    }

                                    result.push(user);
                                },
                                function (err) {
                                    console.log(err);
                                })
                    );
            });

            $q.all(promiseArray).then(function () {
                vm.users = result;
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