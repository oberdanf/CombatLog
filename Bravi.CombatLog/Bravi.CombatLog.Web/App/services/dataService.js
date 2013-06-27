/*Jquery Ajax to get and post data to Combat Log API*/
define(function (require) {
    var character = require('models/character');
    var player = require('models/player');

    var getAllCharacters = function () {
        var deferred = new $.Deferred();
        var allCharacters = [
            new character('scorpion', '../../Content/characters/scorpion.png'),
            new character('reptile', '../../Content/characters/reptile.png'),
            new character('smoke', '../../Content/characters/smoke.png'),
            new character('sub-zero', '../../Content/characters/sub-zero.png')
        ];
        
        return deferred.resolve(allCharacters).promise();
    };
    
    var getAllPlayers = function () {
        var deferred = new $.Deferred();
        var allPlayers = [
            new player(1, 'Danillo Corvalan'),
            new player(2, 'Danilo Garcia'),
            new player(3, 'Maurício Minella'),
            new player(4, 'Maycon Bezerra')
        ];

        return deferred.resolve(allPlayers).promise();
    };
    
    var syncCombatWithServer = function (combat) {
        if (!combat) {
            throw new Error('Combat is Null');
        }
        
        var deferred = new $.Deferred();
        return deferred.resolve(true).promise();
    };

    return {
        getAllCharacters: getAllCharacters,
        getAllPlayers: getAllPlayers,
        syncCombatWithServer: syncCombatWithServer
    };
});