angular
.module('justo')
.directive('autoScroll', autoScroll);

autoScroll.$inject = ['$timeout'];
function autoScroll($timeout) {
  return {
    scope: {
      scrollToBottom: '='
    },
    restrict: 'A',
    link: function(scope, element, attr) {
      scope.$watchCollection('scrollToBottom', function(newVal) {
        if (newVal) {
          $timeout(function() {
            element[0].scrollTop =  element[0].scrollHeight;
          }, 0);
        }

      });
    }
  };
}
