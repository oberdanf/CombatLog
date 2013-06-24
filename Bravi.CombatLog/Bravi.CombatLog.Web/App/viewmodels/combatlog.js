define(function (require) {
    var currentPlayers = require('models/currentPlayers');
    

    return {
        selectedPlayers: function() {
            var selectedFromCurrentPlayers = currentPlayers.getSelectedPlayers();
            if (selectedFromCurrentPlayers.length > 2) {
                //impeed to have more than two players selected
                throw new Error('Not possible to have more than 2 players selected!');
            }

            return selectedFromCurrentPlayers;
        },
        activate: function() {
        }
    };
});