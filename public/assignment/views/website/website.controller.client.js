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

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
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
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
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
                website = WebsiteService.createWebsite(vm.userId, website);
                if (website) {
                    vm.success = "Website created";
                    $location.url("/user/" + vm.userId + "/website");
                } else {
                    vm.alert = "Unable to create website";
                }
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
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function back() {
            $location.url("/user/" + vm.userId + "/website");
        }

        function newWebsite() {
            $location.url("/user/" + vm.userId + "/website/new");
        }

        function updateWebsite(website) {
            website = WebsiteService.updateWebsite(vm.websiteId, website);
            if (website) {
                vm.success = "Website Updated";
                $location.url("/user/" + vm.userId + "/website");
            } else {
                vm.alert = "Unable to update website";
            }
        }

        function deleteWebsite() {
            var response = WebsiteService.deleteWebsite(vm.websiteId);
            if (response) {
                vm.success = "Website deleted";
                $location.url("/user/" + vm.userId + "/website");
            } else {
                vm.alert = "Unable to delete website";
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

})();