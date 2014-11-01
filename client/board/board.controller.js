angular.module('ppc').controller('BoardController', BoardController);

function BoardController($stateParams, $mdDialog, boardService, _) {
    this.board = boardService.get($stateParams.id);
    this.openTask = openTask;
    this.addTask = addTask;
    this.onDrop = onDrop;
    this.removeTask = removeTask;

    function onDrop(task, column) {
        if (!column.tasks) {
            column.tasks = [];
        }
        column.tasks.unshift(task);
    }

    function removeTask(task, column) {
        _.remove(column.tasks, function(otherTask) {
            return otherTask === task;
        });
        this.board.$save();
    }

    function addTask(event) {
        var board = this.board;
        $mdDialog.show({
            templateUrl: 'task/task.html',
            targetEvent: event,
            controller: TaskController,
            controllerAs: 'task',
            locals: {
                task: {
                    title: "",
                    description: ""
                },
                edit: false
            }
        }).then(function(task) {
            if (!board.columns[0].tasks) {
                board.columns[0].tasks = [];
            }
            board.columns[0].tasks.push(task);
            board.$save();
        });

    }

    function openTask(task) {
        var board = this.board;
        $mdDialog.show({
            templateUrl: 'task/task.html',
            targetEvent: event,
            controller: TaskController,
            controllerAs: 'task',
            locals: {
                task: _.clone(task),
                edit: false
            }
        }).then(function(modifiedTask) {
            _.merge(task, modifiedTask);
            board.$save();
        });
    }
}