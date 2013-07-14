define(function (require) {
    var round = require('models/round');
    
    var match = function (playerCharacter1, playerCharacter2) {
        var self = this;

        self.playerCharacter1 = playerCharacter1;
        self.playerCharacter2 = playerCharacter2;

        self.roundNumber = ko.observable(1);
        self.rounds = [];
        self.matchWinner = ko.observable('');
        self.finished = ko.observable(false);

        self.finishRound = function (winner, flawlessVictory) {
            if (self.finished() === true) {
                throw new Error('match is finished');
            }
            
            var currentRoundNumber = self.roundNumber();

            if (currentRoundNumber === 1) {
                self.rounds.push(new round(winner, flawlessVictory));
                self.roundNumber(self.roundNumber() + 1);
            }
            else if (currentRoundNumber === 2) {
                self.rounds.push(new round(winner, flawlessVictory));

                var lastRoundWinner = self.rounds[0].winner();
                if (winner.playerNumber === lastRoundWinner.playerNumber) {
                    self.matchWinner(winner);
                    self.finished(true);
                } else {
                    self.roundNumber(self.roundNumber() + 1);
                }
            }
            else if (currentRoundNumber === 3) {
                self.rounds.push(new round(winner, flawlessVictory));
                self.matchWinner(winner);
                self.finished(true);
            }
        };
    };

    return match;
});