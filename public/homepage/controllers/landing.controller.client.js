(function () {
    angular
        .module('Homepage')
        .controller('LandingController', LandingController);

    function LandingController($state, $location, $window) {
        var vm = this;
        vm.landingIndex = 4;
        vm.aboutIndexStart = 3;
        vm.contactIndexStart = 2;
        vm.skillsIndexStart = 1;
        vm.aboutIndexEnd = 5;
        vm.contactIndexEnd = 5;
        vm.skillsIndexEnd = 5;
        vm.landing = $('#landing');
        vm.about = $('#about');
        vm.contact = $('#contact');
        vm.skills = $('#skills');
        vm.width = $(window).width();
        vm.time = 750;
        vm.address = $location.absUrl().split('/');
        vm.route = route;

        function init() {
            vm.landing.css('z-index', vm.landingIndex);
            vm.about.css('z-index', vm.aboutIndexStart);
            vm.contact.css('z-index', vm.contactIndexStart);
            vm.skills.css('z-index', vm.skillsIndexStart);
        }
        init();

        function route(toState) {

            switch(toState) {
                case 'about':
                    vm.about
                        .velocity({translateX: vm.width}, {
                            duration: vm.time, easing: "easeInOut", complete: function () {
                                vm.about.css('z-index', vm.aboutIndexEnd);
                            }
                        })
                        .velocity("reverse", {
                            duration: vm.time, easing: "easeInOut", complete: function () {
                                $state.go(toState);
                            }
                        });
                    break;
                case 'contact':
                    vm.contact
                        .velocity({translateX: vm.width}, {
                            duration: vm.time, easing: "easeInOut", complete: function () {
                                vm.contact.css('z-index', vm.contactIndexEnd);
                            }
                        })
                        .velocity("reverse", {
                            duration: vm.time, easing: "easeInOut", complete: function () {
                                $state.go(toState);
                            }
                        });
                    break;
                case 'skills':
                    vm.skills
                        .velocity({translateX: vm.width}, {
                            duration: vm.time, easing: "easeInOut", complete: function () {
                                vm.skills.css('z-index', vm.skillsIndexEnd);
                            }
                        })
                        .velocity("reverse", {
                            duration: vm.time, easing: "easeInOut", complete: function () {
                                $state.go(toState);
                            }
                        });
                    break;
                case 'github':
                    $window.location.href = "https://github.com/ksskarthik628";
                    break;
                case 'wam':
                    $window.location.href = vm.address[0] + "//" + vm.address[2] + "/" + "assignment";
                    break;
                case 'bbb':
                    $window.location.href = vm.address[0] + "//" + vm.address[2] + "/" + "project";
                    break;
            }
        }
    }
})();