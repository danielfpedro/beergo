angular.module('starter.services', [])

.factory('Auth', function(
	$http,
	$q,
	CONFIG,
	$window
) {
	return {
		login: function(){
			console.log('Logando...');
			var defer = $q.defer();

			this.getAccessToken()
				.then(function(token){
					console.log(token);

					$http.get(CONFIG.WEBSERVICE_BASE_URL + 'usuarios/token.json?access_token=' + token)
						.then(function(response){
							console.log(response.data.token);
							defer.resolve();
						}, function(error) {
							console.log(error);
							defer.reject(error);
						})
				}, function(err){
					defer.reject(err);
				});

			return defer.promise;
		},
		getAccessToken: function() {
			var defer = $q.defer();
			defer.resolve();

			// ezfb.getLoginStatus(function(response) {
			// 	if(response.status === 'connected') {
			// 		ezfb.api('/me?fields=email,name', function(response) {
			// 			console.log(response);
			// 		});
			// 	} else {
			// 		ezfb.login(function(response) {
			// 			// Do something with response.
			// 			// console.log(response.authResponse.accessToken);
			// 			this.getAccessToken();
			// 			// defer.resolve(response.authResponse.accessToken);
			// 		}, {scope: 'email,public_profile'});
			// 	}
			// });

			return defer.promise;
		}
	}
})

.factory('Chats', function() {
	// Might use a resource here that returns a JSON array

	// Some fake testing data
	var chats = [{
		id: 0,
		name: 'Ben Sparrow',
		lastText: 'You on your way?',
		face: 'img/ben.png'
	}, {
		id: 1,
		name: 'Max Lynx',
		lastText: 'Hey, it\'s me',
		face: 'img/max.png'
	}, {
		id: 2,
		name: 'Adam Bradleyson',
		lastText: 'I should buy a boat',
		face: 'img/adam.jpg'
	}, {
		id: 3,
		name: 'Perry Governor',
		lastText: 'Look at my mukluks!',
		face: 'img/perry.png'
	}, {
		id: 4,
		name: 'Mike Harrington',
		lastText: 'This is wicked good ice cream.',
		face: 'img/mike.png'
	}];

	return {
		all: function() {
			return chats;
		},
		remove: function(chat) {
			chats.splice(chats.indexOf(chat), 1);
		},
		get: function(chatId) {
			for (var i = 0; i < chats.length; i++) {
				if (chats[i].id === parseInt(chatId)) {
					return chats[i];
				}
			}
			return null;
		}
	};
});
