(function () {
    angular
        .module('Homepage')
        .controller('ContactController', ContactController);

    function ContactController($state) {
        var vm = this;
        vm.landing = 3;
        vm.about = 4;
        vm.contact = 5;
        vm.route = route;

        function init() {
            $('#landing').css('z-index', vm.landing);
            $('#about').css('z-index', vm.about);
            $('#contact').css('z-index', vm.contact);
        }
        init();

        function route(toState) {
            console.log(toState);
            $state.go(toState);
        }

    }
})();