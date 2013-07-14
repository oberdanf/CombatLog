﻿define(function (require) {
    var combatService = require('services/combatService'),
        sharedSelectedPlayers = require('models/sharedSelectedPlayers'),
        router = require('durandal/plugins/router');

    var selectablePlayerCharacter = function (playerCharacter) {
        var self = this;
        self.playerCharacter = playerCharacter;
        self.selected = ko.observable(false);
    };

    var selectablePlayerCharacter1 = ko.observable('');
    var selectablePlayerCharacter2 = ko.observable('');
    var flawlessVictory = ko.observable(false);
    
    var setRoundWinner = function () {
        var winner = selectablePlayerCharacter1().selected() === true ?
            selectablePlayerCharacter1().playerCharacter.player :
            selectablePlayerCharacter2().playerCharacter.player;

        combatService.finishAndNextRound(winner, flawlessVictory());
    };

    return {
        activate: function () {
            var deferred = new $.Deferred();

            combatService.clear();
            combatService.setPlayersAndCharacters(
                sharedSelectedPlayers.playerCharacter1(),
                sharedSelectedPlayers.playerCharacter2()
            );
            combatService.startCombat();

            selectablePlayerCharacter1(
                new selectablePlayerCharacter(sharedSelectedPlayers.playerCharacter1())
            );
            selectablePlayerCharacter2(
                new selectablePlayerCharacter(sharedSelectedPlayers.playerCharacter2())
            );

            combatService.roundNumber.subscribe(function(newValue) {
                selectablePlayerCharacter1().selected(false);
                selectablePlayerCharacter2().selected(false);
                flawlessVictory(false);
            });

            return deferred.resolve().promise();
        },
        setRoundWinner: setRoundWinner,
        roundNumber: combatService.roundNumber,
        isMatchFinished: combatService.isMatchFinished,
        selectablePlayerCharacter1: selectablePlayerCharacter1,
        selectablePlayerCharacter2: selectablePlayerCharacter2,
        flawlessVictory: flawlessVictory,
        selectPlayer: function (playerNumber) {
            if (combatService.isMatchFinished()) {
                throw new Error("Combat is Finished!");
            }
            
            var player1Number = selectablePlayerCharacter1().playerCharacter.player.playerNumber;
            var player2Number = selectablePlayerCharacter2().playerCharacter.player.playerNumber;
            
            if (playerNumber === player1Number) {
                selectablePlayerCharacter2().selected(false);
                selectablePlayerCharacter1().selected(true);
            }
            else if (playerNumber === player2Number) {
                selectablePlayerCharacter1().selected(false);
                selectablePlayerCharacter2().selected(true);
            }
            else {
                throw new Error('Player does not exist');
            }
        },
        cancelCombat: combatService.cancelCombat,
        saveAndFinishCombat: combatService.saveAndFinishCombat,
        saveAndNextMatch: combatService.saveAndAddMatch
    };

//﻿define(function (require) {
//    var router = require('durandal/plugins/router'),
//        sharedSelectedPlayers = require('models/sharedSelectedPlayers'),
//        combatLogService = require('services/combatService');

//    //player number: 1 or 2
//    var playerWinnerNumber = ko.observable('');
//    //round defaults to 1, then it's increased if necessary.
//    var round = ko.observable(1);
//    var flawlessVictory = ko.observable(false);

//    var selectedPlayers = function () {
//        return [sharedSelectedPlayers.player1(), sharedSelectedPlayers.player2()];
//    };

//    var save = function (hasNextRound) {
//        var winnerPlayer = selectedPlayers()[playerWinnerNumber() - 1];

//        combatLogService.saveCombat(winnerPlayer, round(), flawlessVictory()).done(saveCombatDone);

//        function saveCombatDone(nameOfPlayerWinnerTest) {
//            if (nameOfPlayerWinnerTest) {
//                alert('successfully saved! playerName:' + nameOfPlayerWinnerTest);
//            }
//        }

//        if (hasNextRound === true) {
//            //increase round and clean form
//            round(round() + 1);
//            playerWinnerNumber('');
//        } else {
//            router.navigateTo('#/home');
//        }
//    };

//    return {
//        selectedPlayers: selectedPlayers,
//        playerWinnerNumber: playerWinnerNumber,
//        round: round,
//        saveAndFinish: function () { save(false); },
//        saveAndNextRound: function () { save(true); },
//        cancel: function() {
//            router.navigateBack();
//        },
//        activate: function () {
//            if (!this.selectedPlayers() || this.selectedPlayers().length !== 2) {
//                router.navigateTo('#/selectplayers');
//            }
//        }
//    };
});