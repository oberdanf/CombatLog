define(function (require) {
    var currentPlayers = require('models/currentPlayers'),
        router = require('durandal/plugins/router'),
        combatLogService = require('services/combatLogService');

    //player number: 1 or 2
    var playerWinnerNumber = ko.observable('');
    //round defaults to 1, then it's increased if necessary.
    var round = ko.observable(1);
    var flawlessVictory = ko.observable(false);

    var selectedPlayers = function () {
        var selectedFromCurrentPlayers = currentPlayers.getSelectedPlayers();
        if (selectedFromCurrentPlayers.length > 2) {
            //impeed to have more than two players selected
            throw new Error('Not possible to have more than 2 players selected!');
        }

        return selectedFromCurrentPlayers;
    };

    var save = function (hasNextRound) {
        var winnerPlayer = selectedPlayers()[playerWinnerNumber() - 1];

        combatLogService.saveCombat(winnerPlayer, round(), flawlessVictory()).done(saveCombatDone);

        function saveCombatDone(nameOfPlayerWinnerTest) {
            if (nameOfPlayerWinnerTest) {
                alert('successfully saved! playerName:' + nameOfPlayerWinnerTest);
            }
        }

        if (hasNextRound === true) {
            //increase round and clean form
            round(round() + 1);
            playerWinnerNumber('');
        } else {
            router.navigateTo('#/home');
        }
    };

    return {
        selectedPlayers: selectedPlayers,
        playerWinnerNumber: playerWinnerNumber,
        round: round,
        saveAndFinish: function () { save(false); },
        saveAndNextRound: function () { save(true); },
        cancel: function() {
            router.navigateBack();
        },
        activate: function () {
            if (!this.selectedPlayers() || this.selectedPlayers().length !== 2) {
                router.navigateTo('#/selectplayers');
            }
        }
    };
});