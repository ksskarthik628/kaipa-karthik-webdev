(function () {
    angular
        .module('Homepage')
        .config(['$stateProvider', '$urlRouterProvider', Config]);

    function Config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/landing");

        $stateProvider
            .state("landing", {
                url: "/landing",
                controller: "LandingController",
                controllerAs: "model"
            })
            .state("about", {
                url: "/about",
                controller: "AboutController",
                controllerAs: "model"
            })
            .state("contact", {
                url: "/contact",
                controller: "ContactController",
                controllerAs: "model"
            });
    }
})();