define(function() {
    var round = function (winner, flawlessVictory) {
        var self = this;

        self.winner = ko.observable(winner);
        self.flawlessVictory = flawlessVictory;
    };

    return round;
});