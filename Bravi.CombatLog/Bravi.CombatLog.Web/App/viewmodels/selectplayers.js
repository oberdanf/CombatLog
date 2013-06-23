define(function (require) {
    var currentPlayers = require('models/currentPlayers');

    var startLog = function () {
        if (currentPlayers.getSelectedPlayers().length > 1) {
        } else {
            alert('In order to start a log you must have at least two players!');
        }
    };
    
    return {
        players: currentPlayers.getCurrentPlayers(),
        selectedPlayers: currentPlayers.getSelectedPlayers,
        viewAttached: function () {
            $('body').trigger('create');
            setTimeout(function() {
                $('body').trigger('create');
            }, 250);
        },
        startLog: startLog
    };
});