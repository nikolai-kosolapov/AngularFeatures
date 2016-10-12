'use strict';

// Helps to define when it's time to load more rows (used for lazy loading)
angular.module('ADE').directive("scrollHelper", function () {
    return {
        scope: {
        	loadStep: '=loadStep', // row height
            onNeedTop:'&onNeedTop',
            onNeedBottom:'&onNeedBottom'
        },
        link: function (scope, element, attrs) {
        	scope.currentOffset = scope.currentOffset || element[0].scrollTop;

	        element.on("scroll", function () {
	        	// Distance from the top of the container element up to the top of the scrollable element (hidden)
	        	var topDist = element[0].scrollTop;
	        	// Distance from the bottom of the container element to the bottom of the scrollable element
	        	var bottomDist = element[0].scrollHeight - topDist - element[0].clientHeight;
	        	
	        	// Scrolling down
	        	if (topDist > scope.currentOffset) {
	        		// There is less than 1 row hidden below => need to add more rows
	            	if(bottomDist < scope.loadStep) {
			            scope.onNeedBottom();
			        }
	            } else { // Scrolling up
	            	// There is less than 1 row hidden above => need to add more rows
	            	if(topDist < scope.loadStep) {
		              scope.onNeedTop();
		        	}
	            }
	        });
	    }
    };
});