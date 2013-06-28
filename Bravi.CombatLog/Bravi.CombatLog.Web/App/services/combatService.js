define(function(require) {
    var dataService = require('services/dataService'),
        combat = require('models/combat'),
        match = require('models/match');

    var currentCombat = ko.observable('');
    var playerCharacter1 = ko.observable('');
    var playerCharacter2 = ko.observable('');

    var _addNewMatch = function () {
        if (!currentCombat()) {
            throw new Error('No combat is started');
        }
        if (!playerCharacter1() || !playerCharacter2()) {
            throw new Error('Players are not set');
        }
        
        var matchToAdd = new match(playerCharacter1(), playerCharacter2());
        currentCombat().addMatch(matchToAdd);
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
            currentCombat('');
            playerCharacter1('');
            playerCharacter2('');
            
            deferred.resolve();
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

    var cancelCombat = function() {
        currentCombat('');
        playerCharacter1('');
        playerCharacter2('');
    };
    
    return {
        startCombat: startCombat,
        setPlayersAndCharacters: setPlayersAndCharacters,
        saveAndFinishCombat: saveAndFinishCombat,
        saveAndAddMatch: saveAndAddMatch,
        cancelCombat: cancelCombat
    };
});