define(function (require) {
    var dataService = require('services/dataService'),
        sharedSelectedPlayers = require('models/sharedSelectedPlayers');

    var selectableCharacter = function (character) {
        var self = this;
        self.character = character;
        self.selected = ko.observable(false);
    };
    
    var playerToChoose = ko.observable('');
    var charactersToSelect = ko.observableArray([]);

    var selectCharacter = function(selectedCharacter) {
        if (!selectedCharacter) {
            throw new Error('character must not be null');
        }
        if (!playerToChoose()) {
            throw new Error('must have a player');
        }

        var chosenPlayerNumber = playerToChoose().playerNumber;

        if (chosenPlayerNumber === sharedSelectedPlayers.playerCharacter1().player.playerNumber) {
            sharedSelectedPlayers.setPlayer1Character(selectedCharacter);
        }
        else if (chosenPlayerNumber === sharedSelectedPlayers.playerCharacter2().player.playerNumber) {
            sharedSelectedPlayers.setPlayer2Character(selectedCharacter);
        }
        else {
            throw new Error('Invalid player Number');
        }


        playersCharacters.push(new playerCharacter(playerToChoose(), selectedCharacter));

        if (playersCharacters.length === 2) {
            sharedSelectedPlayers.setPlayer1Character
            router.navigateTo('#/combatlog');
        } else {
            playerToChoose(sharedSelectedPlayers.playerCharacter2().player);
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
    
    return {
        charactersToSelect: charactersToSelect,
        playerToChoose: playerToChoose,
        selectCharacter: selectCharacter,
        viewAttached: function () {
            $('body').trigger('create');
            setTimeout(function () {
                $('body').trigger('create');
            }, 250);
        },
        activate: function () {
            if (!sharedSelectedPlayers || !sharedSelectedPlayers.playerCharacter1().player || !sharedSelectedPlayers.playerCharacter2().player) {
                throw new Error('shared players not set.');
            }

            playerToChoose(sharedSelectedPlayers.playerCharacter1().player);
            return setCharacters();
        }
    };
});