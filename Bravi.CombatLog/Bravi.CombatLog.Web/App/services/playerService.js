define(function (require) {
    var playerModel = require('models/player'),
        currentPlayers = require('models/currentPlayers');
    
    var loadPlayers = function () {
        var deferred = new $.Deferred();

        var players = [];
        players.push(new playerModel('Danillo Corvalan', 'danillo.corvalan@bravisoftware.com'));
        players.push(new playerModel('Mauricio Minella', 'mauricio.minella@bravisoftware.com'));
        players.push(new playerModel('Maycon Bezerra', 'maycon.bezerra@bravisoftware.com'));
        players.push(new playerModel('Danilo Garcia', 'danilo.garcia@bravisoftware.com'));

        currentPlayers.setPlayers(players);

        return deferred.resolve().promise();
    };

    return {
        loadPlayers: loadPlayers
    };
});