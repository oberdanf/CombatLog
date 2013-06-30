define(function (require) {
    var sharedSelectedPlayers = require('models/selectedPlayers'),
        dataService = require('services/dataService'),
        router = require('durandal/plugins/router');

    var selectablePlayer = function(player) {
        var self = this;
        self.player = player;
        self.selected = ko.observable(false);
    };

    var playersToSelect = ko.observable();

    var setPlayers = function () {
        var deferred = new $.Deffered();
        
        dataService.getAllPlayers().done(getAllPlayersSuccess);
        function getAllPlayersSuccess(playersReturned) {
            var _players = [];
            for (var i = 0; i < playersReturned.length; i++) {
                _players.push(new selectablePlayer(playersReturned[i]));
            }
            playersToSelect(_players);
            deferred.resolve();
        };

        return deferred.promise();
    };

    var goToSelectCharacters = function() {
        var selectedPlayers = playersToSelect().filter(function(item) {
            return item.selected() === true;
        });
        
        if (selectedPlayers.length !== 2) {
            throw new Error('You must have only two players');
        }

        sharedSelectedPlayers.player1(selectedPlayers[0]);
        sharedSelectedPlayers.player2(selectedPlayers[1]);
        
        router.navigateTo('#/selectcharacters');
    };

    return {
        playersToSelect : playersToSelect,
        goToSelectCharacters: goToSelectCharacters,
        viewAttached: function () {
            $('body').trigger('create');
            setTimeout(function() {
                $('body').trigger('create');
            }, 250);
        },
        activate: function () {
            return setPlayers();
        },
    };
});