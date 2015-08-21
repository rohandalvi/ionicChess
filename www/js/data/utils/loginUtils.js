/**
 * Created by rohandalvi on 8/20/15.
 */
/*
ALthough the name might be misleading, but this file is only for UI utils
 */

function showErrorLoginPopup($scope,$ionicPopup){
    var myErrorPopup = $ionicPopup.show({
        title: "Login Error",
        subTitle: "Please use a valid username/password",
        scope: $scope,
        buttons:[{
            text: 'OK'
        }]
    });
}