angular.module('ppc').controller('MainController', MainController);

function MainController($state, boardService) {
    this.boards = boardService.all();
    this.name = "";
    this.createBoard = function() {
        this.boards.$add({
            name: this.name,
            columns: [
                {
                    name: "Backlog",
                    tasks: {}
                },
                {
                    name: "In progress"
                },
                {
                    name: "Done"
                }
            ]
        }).then(function(ref) {
            var id = ref.name();
            $state.go('board', {id: id});
        });
    };
}