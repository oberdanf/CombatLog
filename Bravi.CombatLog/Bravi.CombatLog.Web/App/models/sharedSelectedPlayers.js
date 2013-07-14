define(function (require) {
    var playerCharacterModel = require('models/playerCharacter');

    var playerCharacter1 = ko.observable('');
    var playerCharacter2 = ko.observable('');

    return {
        playerCharacter1: playerCharacter1,
        playerCharacter2: playerCharacter2,
        setPlayer1: function (player) {
            playerCharacter1(new playerCharacterModel(player));
        },
        setPlayer2: function (player) {
            playerCharacter2(new playerCharacterModel(player));
        },
        setPlayer1Character: function (character) {
            if (!playerCharacter1()) {
                throw new Error('player 1 is null');
            }
            playerCharacter1().setCharacter(character);
        },
        setPlayer2Character: function (character) {
            if (!playerCharacter2()) {
                throw new Error('player 2 is null');
            }
            playerCharacter2().setCharacter(character);
        }
    };
});