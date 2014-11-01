angular.module('ppc').controller('BoardController', BoardController);

function BoardController($stateParams, $mdDialog, boardService, _) {
    this.board = boardService.get($stateParams.id);
    this.addTask = function(event) {
        var board = this.board;
        $mdDialog.show({
            templateUrl: 'task/task.html',
            targetEvent: event,
            controller: TaskController,
            controllerAs: 'task'
        }).then(function(task) {
            if (!board.columns[0].tasks) {
                board.columns[0].tasks = [];
            }
            board.columns[0].tasks.push(task);
            board.$save();
        });

    };

    this.onDrop = function(task, column) {
        if (!column.tasks) {
            column.tasks = [];
        }
        column.tasks.push(task);
    };

    this.removeTask = function(task, column) {
        _.remove(column.tasks, function(otherTask) {
            return otherTask === task;
        })
        this.board.$save();
    };
}