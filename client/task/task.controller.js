angular.module('ppc').controller('TaskController', TaskController);

function TaskController($mdDialog, task) {
    this.task = task;

    this.hide = function() {
        $mdDialog.hide(this.task);
    };

    this.cancel = function() {
        $mdDialog.cancel();
    };
}