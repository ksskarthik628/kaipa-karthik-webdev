(function () {
    angular
        .module('Homepage')
        .controller('LandingController', LandingController);

    function LandingController($state) {
        var vm = this;
        vm.landingIndex = 3;
        vm.aboutIndex = 2;
        vm.contactIndex = 1;
        vm.landing = $('#landing');
        vm.about = $('#about');
        vm.contact = $('#contact');
        vm.route = route;

        function init() {
            vm.landing.css('z-index', vm.landingIndex);
            vm.about.css('z-index', vm.aboutIndex);
            vm.contact.css('z-index', vm.contactIndex);
        }
        init();

        function route(toState) {
            console.log(toState);

            vm.about.velocity({translateX: "2000px"}, {duration: 5000, complete: function () {
                $state.go(toState);
            }});
        }
    }
})();