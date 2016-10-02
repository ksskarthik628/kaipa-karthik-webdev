(function () {
    angular
        .module('Homepage')
        .controller('ContactController', ContactController);

    function ContactController($state) {
        var vm = this;
        vm.landingIndex = 3;
        vm.aboutIndex = 4;
        vm.contactIndex = 5;
        vm.landing = $('#landing');
        vm.about = $('#about');
        vm.contact = $('#contact');
        vm.width = $(window).width();
        vm.time = 750;
        vm.route = route;

        function init() {
            vm.landing.css('z-index', vm.landingIndex);
            vm.about.css('z-index', vm.aboutIndex);
            vm.contact.css('z-index', vm.contactIndex);
        }
        init();

        function route(toState) {

            switch(toState) {
                case 'about':
                    vm.about
                        .velocity({translateX: vm.width}, {
                            duration: vm.time, easing: "easeInOut", complete: function () {
                                vm.about.css('z-index', 4);
                            }
                        })
                        .velocity("reverse", {
                            duration: vm.time, easing: "easeInOut", complete: function () {
                                $state.go(toState);
                            }
                        });
                    break;
                case 'landing':
                    vm.landing
                        .velocity({translateX: vm.width}, {
                            duration: vm.time, easing: "easeInOut", complete: function () {
                                vm.landing.css('z-index', 4);
                            }
                        })
                        .velocity("reverse", {
                            duration: vm.time, easing: "easeInOut", complete: function () {
                                $state.go(toState);
                            }
                        });
                    break;
            }

        }

    }
})();