(function () {
    angular
        .module('WebAppMaker')
        .controller('PageListController', PageListController)
        .controller('NewPageController', NewPageController)
        .controller('EditPageController', EditPageController);

    function PageListController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.back = back;
        vm.newPage = newPage;
        vm.openPage = openPage;
        vm.editPage = editPage;
        vm.profile = profile;
        vm.clear = clear;

        function init() {
            PageService
                .findPagesByWebsiteId(vm.websiteId)
                .then(function (response) {
                    vm.pages = response.data;
                }, function (error) {
                    vm.alert = "Unable to find pages for website";
                });
        }
        init();

        function back() {
            $location.url("/user/" + vm.userId + "/website");
        }

        function newPage() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/new");
        }

        function openPage(page) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + page._id + "/widget");
        }

        function editPage(page) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + page._id);
        }

        function profile() {
            $location.url("/user/" + vm.userId);
        }

        function clear() {
            vm.alert = "";
        }
    }

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.back = back;
        vm.newPage = newPage;
        vm.createPage = createPage;
        vm.openPage = openPage;
        vm.editPage = editPage;
        vm.clear = clear;
        vm.profile = profile;

        function init() {
            PageService
                .findPagesByWebsiteId(vm.websiteId)
                .then(function (response) {
                    vm.pages = response.data;
                }, function (error) {
                    vm.alert = "Unable to find pages for website";
                });
        }
        init();

        function back() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }

        function newPage() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/new");
        }

        function createPage(page) {
            if (page) {
                PageService
                    .createPage(vm.websiteId, page)
                    .then(function (response) {
                        vm.success = "Page created";
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    }, function (error) {
                        vm.alert = "Unable to create page";
                    });
            } else {
                vm.alert = "Please fill fields to create page";
            }
        }

        function openPage(page) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + page._id + "/widget");
        }

        function editPage(page) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + page._id);
        }

        function profile() {
            $location.url("/user/" + vm.userId);
        }

        function clear() {
            vm.success = "";
            vm.alert = "";
        }
    }

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.back = back;
        vm.newPage = newPage;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        vm.openPage = openPage;
        vm.editPage = editPage;
        vm.clear = clear;
        vm.profile = profile;

        function init() {
            PageService
                .findPagesByWebsiteId(vm.websiteId)
                .then(function (response) {
                    vm.pages = response.data;
                }, function (error) {
                    vm.alert = "Unable to find pages for website";
                });
            PageService
                .findPageById(vm.pageId)
                .then(function (response) {
                    vm.page = response.data;
                }, function (error) {
                    vm.alert = "Unable to find page";
                });
        }
        init();

        function back() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }

        function newPage() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/new");
        }

        function updatePage(page) {
            PageService
                .updatePage(vm.pageId, page)
                .then(function (response) {
                    vm.success = "Page updated";
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                }, function (error) {
                    vm.alert = "Unable to update page";
                });
        }

        function deletePage() {
            PageService
                .deletePage(vm.pageId)
                .then(function (response) {
                    vm.success = "Page deleted";
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                }, function (error) {
                    vm.alert = "Unable to delete page";
                });
        }

        function openPage(page) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + page._id + "/widget");
        }

        function editPage(page) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + page._id);
        }

        function profile() {
            $location.url("/user/" + vm.userId);
        }

        function clear() {
            vm.success = "";
            vm.alert = "";
        }
    }

})();