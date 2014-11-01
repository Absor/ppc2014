angular.module('ppc').controller('TaskController', TaskController);

function TaskController($mdDialog) {
    this.task = {
        title: "",
        description: ""
    };

    this.hide = function() {
        $mdDialog.hide(this.task);
    };

    this.cancel = function() {
        $mdDialog.cancel();
    };
}