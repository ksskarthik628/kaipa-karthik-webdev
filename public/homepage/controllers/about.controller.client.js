(function () {
    angular
        .module('Homepage')
        .controller('AboutController', AboutController);

    function AboutController($state, $location, $window) {
        var vm = this;
        vm.landingIndex = 4;
        vm.aboutIndexStart = 5;
        vm.contactIndexStart = 2;
        vm.skillsIndexStart = 1;
        vm.aboutIndexEnd = 3;
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
            $(function () {
                var abm = $("#about-me");
                var navback = $("#about-me-nav");
                abm.scroll(function () {
                    navback.css('top', abm.scrollTop());
                });
            });
        }
        init();

        function route(toState) {

            switch(toState) {
                case 'landing':
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
                    vm.about
                        .velocity({translateX: vm.width}, {
                            duration: vm.time, easing: "easeInOut", complete: function () {
                                vm.about.css('z-index', vm.aboutIndexEnd);
                            }
                        })
                        .velocity("reverse", {
                            duration: vm.time, easing: "easeInOut", complete: function () {
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
                            }
                        });
                    break;
                case 'skills':
                    vm.about
                        .velocity({translateX: vm.width}, {
                            duration: vm.time, easing: "easeInOut", complete: function () {
                                vm.about.css('z-index', vm.aboutIndexEnd);
                            }
                        })
                        .velocity("reverse", {
                            duration: vm.time, easing: "easeInOut", complete: function () {
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
                            }
                        });
                    break;
                case 'github':
                    $window.location.href = "https://github.com/ksskarthik628";
                    break;
                case 'wam':
                    $window.location.href = vm.address[0] + "//" + vm.address[2] + "/" + "assignment";
                    break;
                case 'wc':
                    $window.location.href = vm.address[0] + "//" + vm.address[2] + "/" + "project";
                    break;
            }
        }

    }
})();