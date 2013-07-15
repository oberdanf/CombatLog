define(function (require) {
    var dataService = require('services/dataService'),
        sharedSelectedPlayers = require('models/sharedSelectedPlayers'),
        router = require('durandal/plugins/router');

    var selectableCharacter = function (character) {
        var self = this;
        self.character = character;
        self.selected = ko.observable(false);
    };
    
    var playerToChoose = ko.observable('');
    var charactersToSelect = ko.observableArray([]);

    var selectedCharacters = function() {
        return charactersToSelect().filter(function (item) {
            return item.selected() === true;
        });
    };

    var confirmSelectedCharacterForCurrentPlayer = function () {
        if (!selectedCharacters()) {
            throw new Error('character must not be null');
        }

        var selectedCharacter = selectedCharacters()[0];
        
        if (!selectedCharacter) {
            throw new Error('character must not be null');
        }

        if (!playerToChoose()) {
            throw new Error('must have a player');
        }

        var chosenPlayerNumber = playerToChoose().playerNumber;

        if (chosenPlayerNumber === sharedSelectedPlayers.playerCharacter1().player.playerNumber) {
            sharedSelectedPlayers.setPlayer1Character(selectedCharacter.character);
            charactersToSelect().forEach(function(item) {
                item.selected(false);
            });
            playerToChoose(sharedSelectedPlayers.playerCharacter2().player);
        }
        else if (chosenPlayerNumber === sharedSelectedPlayers.playerCharacter2().player.playerNumber) {
            sharedSelectedPlayers.setPlayer2Character(selectedCharacter.character);
            router.navigateTo('#/combatlog');
        }
        else {
            throw new Error('Invalid player Number');
        }
    };
    
    var setCharacters = function () {
        var deferred = new $.Deferred();

        dataService.getAllCharacters().done(getAllCharactersSuccess);
        function getAllCharactersSuccess(charactersReturned) {
            var _characters = [];
            for (var i = 0; i < charactersReturned.length; i++) {
                _characters.push(new selectableCharacter(charactersReturned[i]));
            }
            charactersToSelect(_characters);
            deferred.resolve();
        };

        return deferred.promise();       
    };

    var clearSelectedCharacters = function() {
        if (!sharedSelectedPlayers || !sharedSelectedPlayers.playerCharacter1().player || !sharedSelectedPlayers.playerCharacter2().player) {
            throw new Error('shared players not set.');
        }

        playerToChoose(sharedSelectedPlayers.playerCharacter1().player);
    };
    
    return {
        charactersToSelect: charactersToSelect,
        selectedCharacters: selectedCharacters,
        playerToChoose: playerToChoose,
        confirmSelectedCharacterForCurrentPlayer: confirmSelectedCharacterForCurrentPlayer,
        clearSelectedCharacters: clearSelectedCharacters,
        viewAttached: function () {
            $('body').trigger('create');
            setTimeout(function () {
                $('body').trigger('create');
            }, 250);
        },
        activate: function () {
            clearSelectedCharacters();
            return setCharacters();
        }
    };
});