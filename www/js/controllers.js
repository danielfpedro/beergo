angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('LoginController', function(
    $scope,
    Auth,
    $state,
    $ionicHistory,
    $ionicLoading,
    $window
) {

    // $timeout(function(){
    //     FB.login(function(response){
    //         console.log(response);
    //     }, {scope: 'email,public_profile'});
    // }, 3000);
    $scope.error = null;

    $scope.doLogout = function() {
        FB.logout();
    }

    $scope.doLogin = function() {

        $ionicLoading.show({
            template: 'Entrando, aguarde...'
        });

        Auth.login()
            .then(function(response){
                
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });

                $state.go('pick-username');    

            }, function(err) {
                $scope.error = err;
            })
            .finally(function() {
                $ionicLoading.hide();
            });
    }
})

.controller('PickUsernameController', function(
    $scope,
    $ionicLoading,
    Me
) {
    $scope.data = {};

    $scope.updateUsername = function() {
        $ionicLoading.show({
            template: 'Entrando, aguarde...'
        });
        console.log('Update username');
        Me.updateUsername($scope.data.username)
            .then(function(){

            })
            .finally(function(){
                $ionicLoading.hide();
            });
    }
});
