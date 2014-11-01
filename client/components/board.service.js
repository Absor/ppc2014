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
        var UserFactory = $FirebaseObject.$extendFactory({
            // these methods exist on the prototype, so we can access the data using `this`
            getFullName: function() {
                return this.firstName + " " + this.lastName;
            }
        });
        var ref = new Firebase('https://ppc.firebaseio.com/boards/' + id);
        return $firebase(ref).$asObject();
    }
}