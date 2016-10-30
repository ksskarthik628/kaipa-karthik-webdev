(function () {
    angular
        .module('WebAppMaker')
        .controller('WidgetListController', WidgetListController)
        .controller('NewWidgetController', NewWidgetController)
        .controller('EditWidgetController', EditWidgetController);

    function WidgetListController($sce, $location, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.back = back;
        vm.newWidget = newWidget;
        vm.editWidget = editWidget;
        vm.reorderWidget = reorderWidget;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;
        vm.profile = profile;
        vm.clear = clear;

        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(function (response) {
                    vm.widgets = response.data;
                }, function (error) {
                    vm.alert = "Unable to find widgets for page";
                });
        }
        init();

        function back() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }

        function newWidget() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/new");
        }

        function editWidget(widget) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget._id);
        }
        
        function reorderWidget(start, end) {
            WidgetService
                .reorderWidget(vm.pageId, start, end)
                .then(init, function (error) {
                    vm.alert = "Unable to reorder widgets";
                })
        }

        function getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function getSafeUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function profile() {
            $location.url("/user/" + vm.userId);
        }

        function clear() {
            vm.alert = "";
        }
    }

    function NewWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.back = back;
        vm.createWidget = createWidget;
        vm.profile = profile;
        vm.clear = clear;

        function back() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }
        
        function createWidget(widgetType) {
            var widget = {};
            widget.widgetType = widgetType;
            WidgetService
                .createWidget(vm.pageId, widget)
                .then(function (response) {
                    var widget = response.data;
                    vm.success = "Widget Created";
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget._id);
                }, function (error) {
                    vm.alert = "Unable to create Widget";
                });
        }

        function profile() {
            $location.url("/user/" + vm.userId);
        }

        function clear() {
            vm.success = "";
            vm.alert = "";
        }
    }

    function EditWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];
        vm.back = back;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.profile = profile;
        vm.clear = clear;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function (response) {
                    vm.widget = response.data;
                }, function (error) {
                    vm.alert = "Unable to find widget";
                });
        }
        init();

        function updateWidget(widget) {

            WidgetService
                .updateWidget(vm.widgetId, widget)
                .then(function (response) {
                    vm.success = "Widget updated";
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                }, function (error) {
                    vm.alert = "Unable to update Widget";
                });
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetId)
                .then(function (response) {
                    vm.success = "Widget deleted";
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                }, function (error) {
                    vm.alert = "Unable to delete widget";
                });
        }

        function back() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
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