angular.module('ppc').controller('TaskController', TaskController);

function TaskController($mdDialog, task, edit) {
    this.task = task;
    this.edit = edit;
    this.hide = hide;
    this.cancel = cancel;

    function hide() {
        $mdDialog.hide(this.task);
    }

    function cancel() {
        $mdDialog.cancel();
    }
}