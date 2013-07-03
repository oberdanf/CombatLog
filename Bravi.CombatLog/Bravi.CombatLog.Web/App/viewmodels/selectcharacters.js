define(function (require) {
    var dataService = require('services/dataService'),
        sharedSelectedPlayers = require('models/sharedSelectedPlayers'),
        playerCharacter = require('models/playerCharacter');

    var selectableCharacter = function (character) {
        var self = this;
        self.character = character;
        self.selected = ko.observable(false);
    };
    
    var playerToChoose = ko.observable('');
    var charactersToSelect = ko.observableArray([]);

    var playersCharacters = [];

    var selectCharacter = function(selectedCharacter) {
        if (!selectedCharacter) {
            throw new Error('character must not be null');
        }
        if (!playerToChoose()) {
            throw new Error('must have a player');
        }
        if (playersCharacters.length >= 2) {
            throw new Error('must have only two players');
        }

        playersCharacters.push(new playerCharacter(playerToChoose(), selectedCharacter));

        if (playersCharacters.length === 2) {
            router.navigateTo('#/combatlog');
        } else {
            playerToChoose(sharedSelectedPlayers.player2());
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
            if (!sharedSelectedPlayers || !sharedSelectedPlayers.player1 || !sharedSelectedPlayers.player2) {
                throw new Error('shared players not set.');
            }

            playerToChoose(sharedSelectedPlayers.player1());
            return setCharacters();
        }
    };
});