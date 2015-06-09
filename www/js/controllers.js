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
            labels: [1, 2, 3, 4,5,6,7],
            series: [[5, 2, 8, 3,6,7,4]]
        });
    })

    .controller('WikiCtrl', function ($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        }
    })

    .controller('WikiDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AddDelCtrl', function ($scope, $ionicModal) {
        var games = [
            {link: './#', img: ["img/cover.jpg","img/cover.jpg"], name: '0yun1', description: "Bu süper bir oyundur."},
            {link: './#', img: ["img/cover.jpg","img/cover.jpg"], name: '0yun2', description: "Bu süper bir oyundur."},
            {link: './#', img: ["img/cover.jpg","img/cover.jpg"], name: '0yun3', description: "Bu süper bir oyundur."},
            {link: './#', img: ["img/cover.jpg","img/cover.jpg"], name: '0yun4', description: "Bu süper bir oyundur."},
            {link: './#', img: ["img/cover.jpg","img/cover.jpg"], name: '0yun5', description: "Bu süper bir oyundur."},
            {link: './#', img: ["img/cover.jpg","img/cover.jpg"], name: '0yun6', description: "Bu süper bir oyundur."},
            {link: './#', img: ["img/cover.jpg","img/cover.jpg"], name: '0yun7', description: "Bu süper bir oyundur."},
            {link: './#', img: ["img/cover.jpg","img/cover.jpg"], name: '0yun8', description: "Bu süper bir oyundur."},
            {link: './#', img: ["img/cover.jpg","img/cover.jpg"], name: '0yun9', description: "Bu süper bir oyundur."}
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
            {link: './#', enableFriends: true,  name: 'oyun1'},
            {link: './#', enableFriends: true,  name: 'oyun2'},
            {link: './#', enableFriends: true,  name: 'oyun3'},
            {link: './#', enableFriends: true,  name: 'oyun4'},
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
