'use strict';

// Checks if the user clicked inside the element
angular.module('ADE').directive('clickAnywhereButHere', ['$document', function ($document) {    
    return {
        link: function postLink(scope, element, attrs) {
            var onClick = function (event) {
                var isChild = $(element).has(event.target).length > 0;
                var isSelf = element[0] == event.target;
                var isInside = isChild || isSelf;
                if (!isInside) {
                    // if not inside - apply callback function
                    setTimeout(function(){scope.$apply(attrs.clickAnywhereButHere);});
                }                
            }
            $document.bind('click', onClick);
            element.on('$destroy', function () {
                $document.unbind('click', onClick);
            });
        }
    };
}]);