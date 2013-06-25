define(function (require) {
    var currentPlayers = require('models/currentPlayers'),
        router = require('durandal/plugins/router');

    //player number: 1 or 2
    var playerWinnerNumber = ko.observable('');

    return {
        selectedPlayers: function() {
            var selectedFromCurrentPlayers = currentPlayers.getSelectedPlayers();
            if (selectedFromCurrentPlayers.length > 2) {
                //impeed to have more than two players selected
                throw new Error('Not possible to have more than 2 players selected!');
            }

            return selectedFromCurrentPlayers;
        },
        playerWinnerNumber: playerWinnerNumber,
        activate: function () {
            if (!this.selectedPlayers() || this.selectedPlayers().length !== 2) {
                router.navigateTo('#/selectplayers');
            }
        }
    };
});