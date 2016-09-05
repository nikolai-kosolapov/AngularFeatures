'use strict';

function EditableFieldCtrl() {
    var self = this;

    this.editMode = false;
    this.editButtonShow = false;

    this.edit = function () {
        self.copyValue = self.value;
        self.editMode = true;
    };

    this.cancel = function () {
        self.editMode = false;
    };

    this.save = function () {
        self.value = self.copyValue;
        self.editMode = false;
        self.onUpdate({value: self.value});
    };
}

angular.module('BEOP').component("editableField",  {
    templateUrl: '../static/beop/partials/editableField/editableField.html',
    bindings: {
        elementId: '@',
        value: '<',
        onUpdate: '&'
    },
    controller: EditableFieldCtrl
});

angular.module('BEOP').directive('clickAnywhereButHere', ['$document', function ($document) {
    return {
        link: function postLink(scope, element, attrs) {
            var onClick = function (event) {
                var isChild = $(element).has(event.target).length > 0;
                var isSelf = element[0] == event.target;
                var isInside = isChild || isSelf;
                if (!isInside) {
                    scope.$apply(attrs.clickAnywhereButHere)
                }
                
            }
            $document.bind('click', onClick);

            element.on('$destroy', function () {
                $document.unbind('click', onClick);
            });
        }
    };
}]);