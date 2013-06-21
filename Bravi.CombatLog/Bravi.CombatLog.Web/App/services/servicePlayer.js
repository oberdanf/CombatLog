define(function (require) {
    var playerModel = require('models/player');
    var getPlayers = function() {
        var players = [];
        players.push(new playerModel('Danillo', 'danillo.corvalan@bravisoftware.com'));
        players.push(new playerModel('Mauricio', 'mauricio.minella@bravisoftware.com'));
        players.push(new playerModel('Maycon', 'maycon.bezerra@bravisoftware.com'));

        return players;
    };

    return {
        getPlayers: getPlayers
    };
});