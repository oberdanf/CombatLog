define(function (require) {
    var character = require('models/character');

    var allCharacters = [
        new character('scorpion', '../../Content/characters/scorpion.png'),
        new character('reptile', '../../Content/characters/reptile.png'),
        new character('smoke', '../../Content/characters/smoke.png'),
        new character('sub-zero', '../../Content/characters/sub-zero.png')
    ];

    var getAllCharacters = function () {
        var deferred = new $.Deferred();
        return deferred.resolve(allCharacters).promise();
    };
    
    var getFavoriteCharactersByPlayerId = function (playerId) {
        var deferred = new $.Deferred();
        return deferred.resolve([allCharacters[0], allCharacters[1]]).promise();
    };

    return {
        getAllCharacters: getAllCharacters,
        getFavoriteCharactersByPlayerId: getFavoriteCharactersByPlayerId
    };
});