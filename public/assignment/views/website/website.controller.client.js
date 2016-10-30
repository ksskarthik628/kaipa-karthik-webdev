(function () {
    angular
        .module('WebAppMaker')
        .controller('WebsiteListController', WebsiteListController)
        .controller('NewWebsiteController', NewWebsiteController)
        .controller('EditWebsiteController', EditWebsiteController);

    function WebsiteListController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.back = back;
        vm.newWebsite = newWebsite;
        vm.openWebsite = openWebsite;
        vm.editWebsite = editWebsite;
        vm.profile = profile;
        vm.clear = clear;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(function (response) {
                    vm.websites = response.data;
                }, function (error) {
                    vm.alert = "Unable to find websites for user";
                });
        }
        init();

        function back() {
            $location.url("/user/" + vm.userId);
        }

        function newWebsite() {
            $location.url("/user/" + vm.userId + "/website/new");
        }
        
        function openWebsite(website) {
            $location.url("/user/" + vm.userId + "/website/" + website._id + "/page");
        }

        function editWebsite(website) {
            $location.url("/user/" + vm.userId + "/website/" + website._id);
        }

        function profile() {
            $location.url("/user/" + vm.userId);
        }

        function clear() {
            vm.alert = "";
        }
    }

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.back = back;
        vm.newWebsite = newWebsite;
        vm.createWebsite = createWebsite;
        vm.openWebsite = openWebsite;
        vm.editWebsite = editWebsite;
        vm.profile = profile;
        vm.clear = clear;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(function (response) {
                    vm.websites = response.data;
                }, function (error) {
                    vm.alert = "Unable to find websites for user";
                });
        }
        init();

        function back() {
            $location.url("/user/" + vm.userId + "/website");
        }

        function newWebsite() {
            $location.url("/user/" + vm.userId + "/website/new");
        }

        function createWebsite(website) {
            if (website) {
                WebsiteService
                    .createWebsite(vm.userId, website)
                    .then(function (response) {
                        var website = response.data;
                        vm.success = "Website created";
                        $location.url("/user/" + vm.userId + "/website");
                    }, function (error) {
                        vm.alert = "Unable to create website";
                    });
            } else {
                vm.alert = "Please enter details to save";
            }
        }

        function openWebsite(website) {
            $location.url("/user/" + vm.userId + "/website/" + website._id + "/page");
        }

        function editWebsite(website) {
            $location.url("/user/" + vm.userId + "/website/" + website._id);
        }

        function profile() {
            $location.url("/user/" + vm.userId);
        }

        function clear() {
            vm.alert = "";
            vm.success = "";
        }
    }

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.back = back;
        vm.newWebsite = newWebsite;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        vm.openWebsite = openWebsite;
        vm.editWebsite = editWebsite;
        vm.profile = profile;
        vm.clear = clear;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(function (response) {
                    vm.websites = response.data;
                }, function (error) {
                    vm.alert = "Unable to find websites for user";
                });
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function (response) {
                    vm.website = response.data;
                }, function (error) {
                    vm.alert = "Unable to find website information";
                });
        }
        init();

        function back() {
            $location.url("/user/" + vm.userId + "/website");
        }

        function newWebsite() {
            $location.url("/user/" + vm.userId + "/website/new");
        }

        function updateWebsite(website) {
            WebsiteService
                .updateWebsite(vm.websiteId, website)
                .then(function (response) {
                    website = response.data;
                    vm.success = "Website Updated";
                    $location.url("/user/" + vm.userId + "/website");
                }, function (error) {
                    vm.alert = "Unable to update website";
                });
        }

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .then(function (response) {
                    vm.success = "Website deleted";
                    $location.url("/user/" + vm.userId + "/website");
                }, function (error) {
                    vm.alert = "Unable to delete website";
                });
        }

        function openWebsite(website) {
            $location.url("/user/" + vm.userId + "/website/" + website._id + "/page");
        }

        function editWebsite(website) {
            $location.url("/user/" + vm.userId + "/website/" + website._id);
        }

        function profile() {
            $location.url("/user/" + vm.userId);
        }

        function clear() {
            vm.alert = "";
            vm.success = "";
        }
    }

})();