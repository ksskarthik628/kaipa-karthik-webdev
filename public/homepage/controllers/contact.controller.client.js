(function () {
    angular
        .module('Homepage')
        .controller('ContactController', ContactController);

    function ContactController($state, $location, $window) {
        var vm = this;
        vm.landingIndex = 4;
        vm.aboutIndexStart = 3;
        vm.contactIndexStart = 5;
        vm.skillsIndexStart = 1;
        vm.aboutIndexEnd = 5;
        vm.contactIndexEnd = 2;
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
                var abm = $("#contact-me");
                var navback = $("#contact-me-nav");
                abm.scroll(function () {
                    navback.css('top', abm.scrollTop());
                });
            });
        }
        init();

        function route(toState) {

            switch(toState) {
                case 'landing':
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
                case 'about':
                    vm.contact
                        .velocity({translateX: vm.width}, {
                            duration: vm.time, easing: "easeInOut", complete: function () {
                                vm.contact.css('z-index', vm.contactIndexEnd);
                            }
                        })
                        .velocity("reverse", {
                            duration: vm.time, easing: "easeInOut", complete: function () {
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
                            }
                        });
                    break;
                case 'skills':
                    vm.contact
                        .velocity({translateX: vm.width}, {
                            duration: vm.time, easing: "easeInOut", complete: function () {
                                vm.contact.css('z-index', vm.contactIndexEnd);
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
                    $window.location.href = "http://github.com/ksskarthik628";
                    break;
                case 'wam':
                    $window.location.href = vm.address[0] + "//" + vm.address[2] + "/" + "assignment";
                    break;
                case 'wc':
                    $window.location.href = vm.address[0] + "//" + vm.address[2] + "/" + "project";
                    break;
                case 'facebook':
                    $window.location.href = "http://facebook.com/ksskarthik";
                    break;
                case 'gmail':
                    $window.location.href = "mailto:ksskarthik628@gmail.com";
                    break;
                case 'instagram':
                    $window.location.href = "http://instagram.com/ksskarthik628";
                    break;
                case 'linkedin':
                    $window.location.href = "http://linkedin.com/in/kssk628";
                    break;
                case 'skype':
                    $window.location.href = "skype:ksskarthik628";
                    break;
                case 'steam':
                    $window.location.href = "https://steamcommunity.com/id/kssk628/";
                    break;
            }
        }

    }
})();