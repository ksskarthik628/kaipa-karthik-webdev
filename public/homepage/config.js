(function () {
    angular
        .module('Homepage')
        .config(Config);
    
    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                redirectTo: "/landing"
            })
            .when("/landing", {
                templateUrl: "views/landing.view.client.html",
                controller: "LandingController",
                controllerAs: "model"
            })
            .when("/about", {
                templateUrl: "views/about.view.client.html",
                controller: "AboutController",
                controllerAs: "model"
            })
            .when("/contact", {
                templateUrl: "views/contact.view.client.html",
                controller: "ContactController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/landing"
            });
    }
})();