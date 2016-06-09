 angular.module('app.controllers').controller('UserProfileCtrl',
   ['$scope', '$rootScope', '$translate',
     '$translatePartialLoader', '$state',
     'StubsFactory', 'NgMap', 'ProfileFactory',
    function($scope, $rootScope, $translate, $translatePartialLoader, $state, StubsFactory, NgMap, ProfileFactory) {
 		$translatePartialLoader.addPart('profile');
 		$translate.refresh();

      $scope.otherProfile = false;

      ProfileFactory.getGeneralInfo().then(function (info) {
        console.log(info);
        if(info.X == '1' && info.Y == '1'){
          info.X = 41.403841;
          info.Y = 2.174340;
        }
        if(typeof info.Image === 'undefined' || info.Image === null || info.Image === ''){
          info.Image = 'assets/img/boy.png';
        }
        if(info.Stars == '0') info.Stars = 4;
        $scope.userInfo = info;
        
        NgMap.getMap().then(function (map) {
          map.setCenter({lat: $scope.userInfo.X, lng: $scope.userInfo.Y });
          map.setZoom(10);
          new google.maps.Marker({position: {lat: $scope.userInfo.X, lng: $scope.userInfo.Y}, map: map});
        });

        //ANUNCIOS
        if(info.ItemsUser != null){
          for (i = 0; i < info.ItemsUser.length; i++) {
            if (typeof info.ItemsUser[i].Image1 === 'undefined' || info.ItemsUser[i].Image1 === null || info.ItemsUser[i].Image1 === '') {
              info.ItemsUser[i].Image1 = 'assets/img/box.png';
            }
            if (typeof info.ItemsUser[i].ItemName === 'undefined' || info.ItemsUser[i].ItemName === null || info.ItemsUser[i].ItemName === '') {
              info.ItemsUser[i].ItemName = 'Caja sorpresa';
            }
          }
        }
        $scope.anunciosUser = info.ItemsUser;

        //VALORACIONES
        $scope.userValoraciones = $scope.userInfo.Valoracions;
        for (var j in $scope.userValoraciones) {
          var item = $scope.userValoraciones[j];

          $htmlstars = '';

          for (var i = 0; i < item.Stars; i++) {
            $htmlstars += '⭐';
          }

          $scope.userValoraciones[j].htmlestrellitas = $htmlstars;
        }

        ProfileFactory.getUserPeticiones().then(function (peticiones) {
          if(peticiones != null) {
            for (i = 0; i < peticiones.length; i++) {
              if (typeof peticiones[i].Image === 'undefined' || peticiones[i].Image === null || peticiones[i].Image === '') {
                peticiones[i].Image = 'assets/img/lupa.png';
              }
              if (typeof peticiones[i].Name === 'undefined' || peticiones[i].Name === null || peticiones[i].Name === '') {
                peticiones[i].Name = 'Lupa mágica';
              }
            }
          }
          $scope.userPeticiones = peticiones;
        });

        ProfileFactory.getUserFavoritos().then(function (favoritos) {
          for (i = 0; i < favoritos.length; i++) {
            if (typeof favoritos[i].Image1 === 'undefined' || favoritos[i].Image1 === null || favoritos[i].Image1 === '') {
              favoritos[i].Image1 = 'assets/img/box.png';
            }
            if (typeof favoritos[i].ItemName === 'undefined' || favoritos[i].ItemName === null || favoritos[i].ItemName === '') {
              favoritos[i].ItemName = 'Caja sorpresa';
            }
          }
          $scope.userFavoritos = favoritos;
        });

      });

      $scope.goToDetail = function (item) {
        $rootScope.actualProduct = item;
        $state.go('app.productDetail');
      };

	 }
 ]);

