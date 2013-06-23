define(function (require) {
    var currentPlayers = require('models/currentPlayers');
    
    return {
        players: currentPlayers.getCurrentPlayers(),
        viewAttached: function () {
            $('body').trigger('create');
            setTimeout(function() {
                $('body').trigger('create');
            }, 250);
        }
    };
});