// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

const DEBUG  = true;

angular.module('starter', [
    'ionic',
    'starter.controllers',
    'starter.services',
    'angular-storage',
    'angular-jwt'
])

.constant('CONFIG', {
    WEBSERVICE_BASE_URL: (DEBUG) ? 'http://localhost/webservice_beergo/' : 'http://beergo.com.br'
})

.run(function(
    $ionicPlatform,
    $window
) {

    if (DEBUG) {
        $window.fbAsyncInit = function() {
            FB.init({ 
              appId: '2079156488976765',
              status: true, 
              cookie: true, 
              xfbml: true,
              version: 'v2.4'
            });
        };        
    }


    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function(
    $stateProvider,
    $urlRouterProvider,
    $httpProvider
) {

    $httpProvider.interceptors.push(['$q', '$location', 'store', function($q, $location, store) {
        return {
            'request': function (config) {
                // console.log(config);
                config.headers = config.headers || {};
                var jwt = store.get('jwt'); 
                if (jwt) {
                    config.headers.Authorization = 'Bearer ' + jwt;
                    config.url = config.url + '?token=' + jwt
                }
                return config;
            }
        };
    }]);

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })

    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
    })
    .state('pick-username', {
        url: '/pick-username',
        templateUrl: 'templates/pick-username.html',
        controller: 'PickUsernameController'
    })

    .state('tab.dash', {
        url: '/dash',
        views: {
            'tab-dash': {
                templateUrl: 'templates/tab-dash.html',
                controller: 'DashCtrl'
            }
        }
    })

    .state('tab.chats', {
            url: '/chats',
            views: {
                'tab-chats': {
                    templateUrl: 'templates/tab-chats.html',
                    controller: 'ChatsCtrl'
                }
            }
        })
        .state('tab.chat-detail', {
            url: '/chats/:chatId',
            views: {
                'tab-chats': {
                    templateUrl: 'templates/chat-detail.html',
                    controller: 'ChatDetailCtrl'
                }
            }
        })

    .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AccountCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

});
