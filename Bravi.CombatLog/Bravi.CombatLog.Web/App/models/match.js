define(function (require) {
    var round = require('models/round');
    
    var match = function (playerCharacter1, playerCharacter2) {
        var self = this;

        self.playerCharacter1 = playerCharacter1;
        self.playerCharacter2 = playerCharacter2;

        self.roundNumber = ko.observable(1);
        self.rounds = ko.observable([]);

        var finished = false;

        self.finishRound = function (playerWinnerNumber, flawlessVictory) {
            if (finished === true) {
                throw new Error('match is finished');
            }
            
            var currentRoundNumber = roundNumber();

            if (currentRoundNumber === 1) {
                self.rounds.push(new round(playerWinnerNumber, flawlessVictory));
                roundNumber(roundNumber() + 1);
            }
            else if (currentRoundNumber === 2) {
                self.rounds.push(new round(playerWinnerNumber, flawlessVictory));
                var lastPlayerNumberWinner = self.rounds()[0].player.playerNumber;
                if (lastPlayerNumberWinner !== playerWinnerNumber) {
                    roundNumber(roundNumber() + 1);
                } else {
                    finished = true;
                }
            }
            else if (currentRoundNumber === 3) {
                self.rounds.push(new round(playerWinnerNumber, flawlessVictory));
                finished = true;
            }
        };
    };

    return match;
});