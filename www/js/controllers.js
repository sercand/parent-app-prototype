angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {
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

    .controller('AddDelCtrl', function ($scope) {
    })

    .controller('MyAppsCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: false
        };
    })


    .controller('SettingsCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
