define(function() {
    var round = function (playerNumberWinner, flawlessVictory) {
        var self = this;

        self.playerNumberWinner = playerNumberWinner;
        self.flawlessVictory = flawlessVictory;
    };

    return round;
});