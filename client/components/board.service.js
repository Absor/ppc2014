angular.module('ppc').factory('boardService', boardService);

function boardService(Firebase, $firebase, $FirebaseObject) {
    return {
        all: all,
        get: get
    };

    function all() {
        var ref = new Firebase('https://ppc.firebaseio.com/boards');
        return $firebase(ref).$asArray();
    }

    function get(id) {
        var ref = new Firebase('https://ppc.firebaseio.com/boards/' + id);
        return $firebase(ref).$asObject();
    }
}