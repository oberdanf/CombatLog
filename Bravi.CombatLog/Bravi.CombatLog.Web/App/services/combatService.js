define(function(require) {
    var dataService = require('services/dataService'),
        combat = require('models/combat'),
        match = require('models/match'),
        router = require('durandal/plugins/router');

    var currentCombat = ko.observable('');
    var playerCharacter1 = ko.observable('');
    var playerCharacter2 = ko.observable('');
    var roundNumber = ko.observable('');
    var isMatchFinished = ko.observable(false);

    var _addNewMatch = function () {
        if (!playerCharacter1() || !playerCharacter2()) {
            throw new Error('Players are not set');
        }
        
        var matchToAdd = new match(playerCharacter1(), playerCharacter2());
        currentCombat().addMatch(matchToAdd);
        
        roundNumber('');
        isMatchFinished(false);

        roundNumber(currentCombat().latestMatch().roundNumber());
        currentCombat().latestMatch().roundNumber.subscribe(function(newValue) {
            roundNumber(newValue);            
        });
        currentCombat().latestMatch().finished.subscribe(function (newValue) {
            isMatchFinished(newValue);
        });        
    };

    var setPlayersAndCharacters = function(playerChar1, playerChar2) {
        playerCharacter1(playerChar1);
        playerCharacter2(playerChar2);
    };
    
    var startCombat = function () {
        if (!currentCombat()) {
            currentCombat(new combat());
        }        
        if (!playerCharacter1() || !playerCharacter2()) {
            throw new Error('Players are not set');
        }

        _addNewMatch();        
    };

    var saveAndFinishCombat = function () {
        var deferred = new $.Deferred();
        
        var combatToSync = currentCombat();
        dataService.syncCombatWithServer(combatToSync).done(successSync);
        
        function successSync(dataReturned) {
            clear();
            
            deferred.resolve();
            router.navigateTo('#/');
        };

        return deferred.promise();
    };

    var saveAndAddMatch = function (newPlayer1Char, newPlayer2Char) {
        var deferred = new $.Deferred();

        var combatToSync = currentCombat();
        dataService.syncCombatWithServer(combatToSync).done(successSync);

        function successSync(dataReturned) {
            if (newPlayer1Char) {
                playerCharacter1(newPlayer1Char);
            }
            if (newPlayer2Char) {
                playerCharacter2(newPlayer2Char);
            }

            _addNewMatch();
            deferred.resolve();
        };

        return deferred.promise();
    };

    var clear = function() {
        currentCombat('');
        playerCharacter1('');
        playerCharacter2('');
        roundNumber('');
        isMatchFinished(false);
    };
    
    return {
        startCombat: startCombat,
        setPlayersAndCharacters: setPlayersAndCharacters,
        saveAndFinishCombat: saveAndFinishCombat,
        saveAndAddMatch: saveAndAddMatch,
        finishAndNextRound: function (winner, flawlessVictory) {
            currentCombat().latestMatch().finishRound(winner, flawlessVictory);
        },
        roundNumber: roundNumber,
        isMatchFinished: isMatchFinished,
        cancelCombat: function() {
            clear();
            router.navigateTo('#/');
        },
        clear: clear
    };
});