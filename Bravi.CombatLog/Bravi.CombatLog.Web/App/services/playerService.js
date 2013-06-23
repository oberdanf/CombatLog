define(function (require) {
    var playerModel = require('models/player'),
        currentPlayers = require('models/currentPlayers');
    
    var loadPlayers = function () {
        var deferred = new $.Deferred();

        var players = [];
        players.push(new playerModel('Danillo', 'danillo.corvalan@bravisoftware.com'));
        players.push(new playerModel('Mauricio', 'mauricio.minella@bravisoftware.com'));
        players.push(new playerModel('Maycon', 'maycon.bezerra@bravisoftware.com'));

        currentPlayers.setPlayers(players);

        return deferred.resolve().promise();
    };

    return {
        loadPlayers: loadPlayers
    };
});