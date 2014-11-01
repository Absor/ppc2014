angular.module('ppc').controller('TaskController', TaskController);

function TaskController($mdDialog, task, edit) {
    this.task = task;
    this.edit = edit;

    this.hide = function() {
        $mdDialog.hide(this.task);
    };

    this.cancel = function() {
        $mdDialog.cancel();
    };
}