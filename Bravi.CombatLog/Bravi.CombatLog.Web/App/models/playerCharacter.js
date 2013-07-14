define(function() {
    var playerCharacter = function(player, character) {
        var self = this;

        self.player = player;
        self.char = character;
        self.setCharacter = function (characterToSet) {
            self.char = characterToSet;
        };
    };

    return playerCharacter;
});