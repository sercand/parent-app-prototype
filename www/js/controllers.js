angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {
        $scope.info = {
            name: "Sercan Degirmenci",
            child: "Zafer Elcik"
        };

        new Chartist.Line('#chart1', {
            labels: [1, 2, 3, 4],
            series: [[100, 120, 180, 200]]
        });

        // Initialize a Line chart in the container with the ID chart2
        new Chartist.Bar('#chart2', {
            labels: [1, 2, 3, 4, 5, 6, 7],
            series: [[5, 2, 8, 3, 6, 7, 4]]
        });
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

    .controller('WikiCtrl', function ($scope) {

    })

    .controller('WikiDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AddDelCtrl', function ($scope, $ionicModal) {
        var games = [
            {
                link: './#',
                logo: "img/cover.jpg",
                img: [{slide: "img/cover.jpg"}, {slide: "img/cover.jpg"}],
                name: '0yun1',
                description: "Bu super bir oyundur."
            },
            {
                link: './#',
                logo: "img/cover.jpg",
                img: [{slide: "img/cover.jpg"}, {slide: "img/cover.jpg"}],
                name: '0yun2',
                description: "Bu super bir oyundur."
            },
            {
                link: './#',
                logo: "img/cover.jpg",
                img: [{slide: "img/cover.jpg"}, {slide: "img/cover.jpg"}],
                name: '0yun3',
                description: "Bu super bir oyundur."
            },
            {
                link: './#',
                logo: "img/cover.jpg",
                img: [{slide: "img/cover.jpg"}, {slide: "img/cover.jpg"}],
                name: '0yun4',
                description: "Bu super bir oyundur."
            },
            {
                link: './#',
                logo: "img/cover.jpg",
                img: [{slide: "img/cover.jpg"}, {slide: "img/cover.jpg"}],
                name: '0yun5',
                description: "Bu super bir oyundur."
            },
            {
                link: './#',
                logo: "img/cover.jpg",
                img: [{slide: "img/cover.jpg"}, {slide: "img/cover.jpg"}],
                name: '0yun6',
                description: "Bu super bir oyundur."
            },
            {
                link: './#',
                logo: "img/cover.jpg",
                img: [{slide: "img/cover.jpg"}, {slide: "img/cover.jpg"}],
                name: '0yun7',
                description: "Bu super bir oyundur."
            },
            {
                link: './#',
                logo: "img/cover.jpg",
                img: [{slide: "img/cover.jpg"}, {slide: "img/cover.jpg"}],
                name: '0yun8',
                description: "Bu super bir oyundur."
            },
            {
                link: './#',
                logo: "img/cover.jpg",
                img: [{slide: "img/cover.jpg"}, {slide: "img/cover.jpg"}],
                name: '0yun9',
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
