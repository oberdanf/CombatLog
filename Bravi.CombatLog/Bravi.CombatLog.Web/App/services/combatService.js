define(function(require) {
    var dataService = require('services/dataService'),
        combat = require('models/combat'),
        match = require('models/match');

    var currentCombat = ko.observable('');
    var playerCharacter1 = ko.observable('');
    var playerCharacter2 = ko.observable('');

    var setPlayersAndCharacters = function(playerChar1, playerChar2) {
        playerCharacter1(playerChar1);
        playerCharacter2(playerChar2);
    };
    var startCombat = function () {
        if (!currentCombat()) {
            currentCombat(new combat());
        }

        var firstMatch = new match();
        currentCombat().addMatch();
    };
    
    return {
        startCombat: startCombat
    };
});