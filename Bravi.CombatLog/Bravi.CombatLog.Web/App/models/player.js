define(function () {    
    var player = function (playerNumber, name) {
        var self = this;

        self.playerNumber = playerNumber;
        self.name = name;
    };
    return player;
});