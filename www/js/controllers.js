var nextStatPage = "";
var nextWikiPage = "";

angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope, $state) {
        $scope.info = {
            name: "Sercan Degirmenci",
            child: "Zafer Elcik"
        };

        $scope.statGo = function (str) {
            nextStatPage = str;
            $state.go('tab.stat');

        };
    })

    .controller('StatCtrl', function ($scope) {
        var statsboiler = [
            {
                code: 'total',
                borlorp: 'line',
                labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
                series: [
                    [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
                ],
                horizontalBars: true,
                name: 'Total Playing Chart',
                description: "Chartist An individual who uses charts or graphs of a securitys historical prices or " +
                "levels to forecast its future trends. A chartist essentially looks for well-known patterns such as " +
                "head-and-shoulders or support and resistance levels in securities so as to trade them more profitably."
            },
            {
                code: 'baw',
                borlorp: 'bar',
                labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
                series: [
                    [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
                ],
                horizontalBars: true,
                name: 'Best and Worst Games',
                description: "Chartist An individual who uses charts or graphs of a securitys historical prices or " +
                "levels to forecast its future trends. A chartist essentially looks for well-known patterns such as " +
                "head-and-shoulders or support and resistance levels in securities so as to trade them more profitably."
            },
            {
                code: 'compare',
                borlorp: 'pie',
                labels: ['Bananas', 'Apples', 'Grapes'],
                series: [20, 15, 40],
                horizontalBars: true,
                name: 'Compare Games',
                description: "Chartist An individual who uses charts or graphs of a securitys historical prices or " +
                "levels to forecast its future trends. A chartist essentially looks for well-known patterns such as " +
                "head-and-shoulders or support and resistance levels in securities so as to trade them more profitably."
            },
            {
                code: 'allstat',
                borlorp: 'bar',
                labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
                series: [
                    [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
                ],
                horizontalBars: true,
                name: 'Total Playing Chart',
                description: "Chartist An individual who uses charts or graphs of a securitys historical prices or " +
                "levels to forecast its future trends. A chartist essentially looks for well-known patterns such as " +
                "head-and-shoulders or support and resistance levels in securities so as to trade them more profitably."
            },
            {
                code: 'matchit',
                borlorp: 'bar',
                labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
                series: [
                    [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
                ],
                horizontalBars: true,
                name: 'Total Playing Chart',
                description: "Chartist An individual who uses charts or graphs of a securitys historical prices or " +
                "levels to forecast its future trends. A chartist essentially looks for well-known patterns such as " +
                "head-and-shoulders or support and resistance levels in securities so as to trade them more profitably."
            }];

        function finder() {
            for (i in statsboiler) {
                if (nextStatPage == statsboiler[i].code) {
                    break;
                }

            }
            return i;
        };

        var ourchart = finder();

        $scope.info = statsboiler[ourchart];
        var data = {
            labels: statsboiler[ourchart].labels,
            series: statsboiler[ourchart].series
        };
        if (statsboiler[ourchart].borlorp == 'line') {
            new Chartist.Line('.ct-chart', data);
        }
        if (statsboiler[ourchart].borlorp == 'bar') {
            new Chartist.Bar('.ct-chart', data);
        }
        if (statsboiler[ourchart].borlorp == 'pie') {
            new Chartist.Pie('.ct-chart', data);
            var options = {
                labelInterpolationFnc: function (value) {
                    return value[0]
                }
            };

            var responsiveOptions = [
                ['screen and (min-width: 640px)', {
                    chartPadding: 30,
                    labelOffset: 100,
                    labelDirection: 'explode',
                    labelInterpolationFnc: function (value) {
                        return value;
                    }
                }],
                ['screen and (min-width: 1024px)', {
                    labelOffset: 80,
                    chartPadding: 20
                }]
            ];
        }


    })


    .controller('loginSignupCtrl', function ($scope, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $state, Auth) {
        // Form data for the login modal
        $scope.loginData = {};
        $scope.registerData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login-email.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.loginModal = modal;
        });

        $ionicModal.fromTemplateUrl('templates/register.html', {
            scope: $scope
        }).then(function (modal2) {
            $scope.registerModal = modal2;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.loginModal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.loginModal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            $ionicLoading.show({
                template: 'Loading...'
            });
            var lData = $scope.loginData;
            Auth.login(lData.email, lData.password, function (err) {
                if (err) {
                    $ionicLoading.hide();
                    console.log(JSON.stringify(err));
                    var alertPopup = $ionicPopup.alert({
                        title: "Login Error",
                        template: err.message || err
                    });
                    alertPopup.then(function (res) {
                        console.log('Thank you for not eating my delicious ice cream cone');
                    });

                    return;
                }
                $scope.loginData = {};
                $state.go('tab.dash');
                $scope.closeLogin();
                $ionicLoading.hide();

                /*   setTimeout(function () {

                 }, 1000);*/

            });
        };

        // Triggered in the login modal to close it
        $scope.closeRegister = function () {
            $scope.registerModal.hide();
        };

        // Open the login modal
        $scope.register = function () {
            $scope.loginModal.hide();
            $scope.registerModal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doRegister = function () {
            console.log('Doing register', $scope.registerData);
            var rData = $scope.registerData;
            $ionicLoading.show({
                template: 'Loading...'
            });
            Auth.register(rData.first_name, rData.last_name, rData.email, rData.password, function (err) {
                if (err) {
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: "Registration Error",
                        template: err.message | err
                    });
                    alertPopup.then(function (res) {
                        console.log('Thank you for not eating my delicious ice cream cone');
                    });
                    return;
                }

                $scope.registerData = {};
                $ionicLoading.hide();
                $scope.closeRegister();
                $state.go('tab.dash');

            });
        };
    })

    .controller('WikiCtrl', function ($scope, $state) {
        $scope.wikiGo = function (str) {
            nextStatPage = str;
            $state.go('tab.wikipage');
        };
    })

    .controller('WikiPageCtrl', function ($scope) {
        var wikiboiler = [
            {
                code: 'nedir',
                name: 'What is Autism Syndrome',
                img: "img/autism.jpg",
                description1: "Autism spectrum disorder (ASD) and autism are both general terms for a group of complex disorders of brain development. These disorders are characterized, in varying degrees, by difficulties in social interaction, verbal and nonverbal communication and repetitive behaviors. With the May 2013 publication of the DSM-5 diagnostic manual, all autism disorders were merged into one umbrella diagnosis of ASD. Previously, they were recognized as distinct subtypes, including autistic disorder, childhood disintegrative disorder, pervasive developmental disorder-not otherwise specified (PDD-NOS) and Asperger syndrome.",
                description2: "Autism appears to have its roots in very early brain development. However, the most obvious signs of autism and symptoms of autism tend to emerge between 2 and 3 years of age. Autism Speaks continues to fund research on effective methods for earlier diagnosis, as early intervention with proven behavioral therapies can improve outcomes. Increasing autism awareness is a key aspect of this work and one in which our families and volunteers play an invaluable role."
            },
            {
                code: 'neden',
                name: 'Why We Should Use Ipad',
                img: "img/app1.jpeg",
                description1: "Autism spectrum disorder (ASD) and autism are both general terms for a group of complex disorders of brain development. These disorders are characterized, in varying degrees, by difficulties in social interaction, verbal and nonverbal communication and repetitive behaviors. With the May 2013 publication of the DSM-5 diagnostic manual, all autism disorders were merged into one umbrella diagnosis of ASD. Previously, they were recognized as distinct subtypes, including autistic disorder, childhood disintegrative disorder, pervasive developmental disorder-not otherwise specified (PDD-NOS) and Asperger syndrome.",
                description2: "Autism appears to have its roots in very early brain development. However, the most obvious signs of autism and symptoms of autism tend to emerge between 2 and 3 years of age. Autism Speaks continues to fund research on effective methods for earlier diagnosis, as early intervention with proven behavioral therapies can improve outcomes. Increasing autism awareness is a key aspect of this work and one in which our families and volunteers play an invaluable role."
            },
            {
                code: 'nedir',
                name: 'How Can We Use This App for Self Learning',
                img: "img/app1.jpeg",
                description1: "Autism spectrum disorder (ASD) and autism are both general terms for a group of complex disorders of brain development. These disorders are characterized, in varying degrees, by difficulties in social interaction, verbal and nonverbal communication and repetitive behaviors. With the May 2013 publication of the DSM-5 diagnostic manual, all autism disorders were merged into one umbrella diagnosis of ASD. Previously, they were recognized as distinct subtypes, including autistic disorder, childhood disintegrative disorder, pervasive developmental disorder-not otherwise specified (PDD-NOS) and Asperger syndrome.",
                description2: "Autism appears to have its roots in very early brain development. However, the most obvious signs of autism and symptoms of autism tend to emerge between 2 and 3 years of age. Autism Speaks continues to fund research on effective methods for earlier diagnosis, as early intervention with proven behavioral therapies can improve outcomes. Increasing autism awareness is a key aspect of this work and one in which our families and volunteers play an invaluable role."
            }
        ];

        function finder() {
            for (i in wikiboiler) {
                if (nextStatPage == wikiboiler[i].code) {
                    break;
                }
            }
            return i;
        };

        var ourwiki = finder();

        $scope.info = wikiboiler[ourwiki];

    })

    .controller('AddDelCtrl', function ($scope, $ionicModal) {
        var games = [
            {
                link: './#',
                logo: "img/app0.jpg",
                img: [{slide: "img/app0.jpg"}, {slide: "img/app0.jpg"}],
                name: '0yun1',
                description: "Bu super bir oyundur."
            },
            {
                link: './#',
                logo: "img/app1.jpeg",
                img: [{slide: "img/app1.jpeg"}, {slide: "img/app1.jpeg"}],
                name: '0yun2',
                description: "Bu super bir oyundur."
            },
            {
                link: './#',
                logo: "img/app3.png",
                img: [{slide: "img/app3.png"}, {slide: "img/app3.png"}],
                name: '0yun3',
                description: "Bu super bir oyundur."
            },
            {
                link: './#',
                logo: "img/app2.png",
                img: [{slide: "img/app2.png"}, {slide: "img/app2.png"}],
                name: '0yun4',
                description: "Bu super bir oyundur."
            },
            {
                link: './#',
                logo: "img/app4.jpg",
                img: [{slide: "img/app4.jpg"}, {slide: "img/app4.jpg"}],
                name: '0yun5',
                description: "Bu super bir oyundur."
            },
            {
                link: './#',
                logo: "img/app5.jpg",
                img: [{slide: "img/app5.jpg"}, {slide: "img/app5.jpg"}],
                name: '0yun6',
                description: "Bu super bir oyundur."
            },
            {
                link: './#',
                logo: "img/app6.jpg",
                img: [{slide: "img/app6.jpg"}, {slide: "img/app6.jpg"}],
                name: '0yun7',
                description: "Bu super bir oyundur."
            }
        ];

        function chunk(arr, size) {
            var newArr = [];
            for (var i = 0; i < arr.length; i += size) {
                newArr.push(arr.slice(i, i + size));
            }

            return newArr;
        }

        $scope.chunkedData = chunk(games, 4);

        $ionicModal.fromTemplateUrl('templates/adddel-app.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.gameModal = modal;
        });

        $scope.closeGameModule = function () {
            $scope.gameModal.hide();
        };

        // Open the login modal
        $scope.gameModule = function (objj) {
            $scope.gameModal.show();
            $scope.openGame = objj;
        };

    })

    .controller('MyAppsCtrl', function ($scope) {
        $scope.games = [
            {link: './#', enableFriends: true, name: 'oyun1'},
            {link: './#', enableFriends: true, name: 'oyun2'},
            {link: './#', enableFriends: true, name: 'oyun3'},
            {link: './#', enableFriends: true, name: 'oyun4'},
            {link: './#', enableFriends: false, name: 'oyun5'},
            {link: './#', enableFriends: false, name: 'oyun6'},
            {link: './#', enableFriends: false, name: 'oyun7'},
            {link: './#', enableFriends: false, name: 'oyun8'},
            {link: './#', enableFriends: false, name: 'oyun9'}
        ];
    })


    .controller('SettingsCtrl', function ($scope) {
        $scope.settings = [
            {name: 'ayaradi1', enable: true},
            {name: 'ayaradi2', enable: true},
            {name: 'ayaradi3', enable: false},
            {name: 'ayaradi4', enable: true},
            {name: 'ayaradi5', enable: false},
            {name: 'ayaradi6', enable: false},
            {name: 'ayaradi7', enable: false},
            {name: 'ayaradi8', enable: true},
            {name: 'ayaradi9', enable: false}
        ];
    });
