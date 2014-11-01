angular.module('ppc').controller('MainController', MainController);

function MainController($state, boardService) {
    this.boards = boardService.all();
    this.name = "";
    this.createBoard = createBoard;

    function createBoard() {
        this.boards.$add(getEmptyBoard(this.name))
            .then(function(ref) {
                var id = ref.name();
                $state.go('board', {id: id});
            });
    }

    function getEmptyBoard(name) {
        return {
            name: name,
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
        };
    }
}