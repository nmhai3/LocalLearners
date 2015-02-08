localLearnersApp.directive('llMostRequested', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'components/requested/mostrequested/mostRequestedDirective.html',
        controller: function($scope, ClassesService) {

            ClassesService.getCategories(function(categories) {
                $scope.categories = categories;
                $scope.selectedCategory = $scope.categories[0];
            });
        }
    }
});