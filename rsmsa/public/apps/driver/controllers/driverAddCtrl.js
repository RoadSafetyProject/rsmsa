/**
 * Created by kelvin on 2/10/15.
 */
angular.module('rsmsaApp')
    .controller('driverAddCtrl',function($scope,$http){
        $scope.data = {};
        $scope.currentKaya = {};
        $scope.currentSaving = false;
        $scope.currentUpdating = false;
        $scope.currentEditting = false;
        $scope.kayaSavedSuccess = false;
        $scope.kayaUpdatedSuccess = false;
        $scope.kayaSavedFalue = false;
        $scope.kayaUpdateFalue = false;
        $scope.currentKaya.nationality = "Tanzania"

        //getting a list of countries
        $http.get('../../countries').success(function(data){
            $scope.data.countries = data;
        });

        //getting a list of driving classes
        $http.get('../../driving_classes').success(function(data){
            $scope.data.driving_classes = [];
           angular.forEach(data,function(classes){
               $scope.data.driving_classes.push({icon: "<img src='/img/"+classes.name+".jpg' />",name: classes.name, descr: classes.description,ticked: false})
            })

        });

        $scope.dateOptions = {
            changeYear: true,
            changeMonth: true,
            dateFormat: 'mm-dd-yy'
        };

        $scope.saveDriver = function(driver){
            driver.driving_class =[];
            angular.forEach( $scope.data.driving_classes, function( value, key ) {
                if ( value.ticked === true ) {
                    driver.driving_class.push(value.name);
                }
            });
            $scope.currentSaving = true;
            $http.post("../../driver", driver).success(function (newDriver) {
                $scope.currentKaya = {};
                $scope.kayaSavedSuccess = true;
                $scope.currentSaving = false;
                $scope.kayaSavedFalue = false;
            }).error(function(){
                $scope.kayaSavedSuccess = false;
                $scope.currentSaving = false;
                $scope.kayaSavedFalue = true;
            });
        }



    });