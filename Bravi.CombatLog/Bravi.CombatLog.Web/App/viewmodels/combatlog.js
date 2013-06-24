define(function (require) {
    var currentPlayers = require('models/currentPlayers'),
        router = require('durandal/plugins/router');

    return {
        selectedPlayers: function() {
            var selectedFromCurrentPlayers = currentPlayers.getSelectedPlayers();
            if (selectedFromCurrentPlayers.length > 2) {
                //impeed to have more than two players selected
                throw new Error('Not possible to have more than 2 players selected!');
            }

            return selectedFromCurrentPlayers;
        },
        setWinner: function (player) {
            alert(player.name + '\r\n' + player.email);
        },
        activate: function () {
            if (!this.selectedPlayers() || this.selectedPlayers().length !== 2) {
                router.navigateTo('#/selectplayers');
            }
        }
    };
});