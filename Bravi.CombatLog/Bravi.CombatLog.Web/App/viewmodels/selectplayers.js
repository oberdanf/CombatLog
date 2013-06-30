define(function (require) {
    var sharedSelectedPlayers = require('models/sharedSelectedPlayers'),
        dataService = require('services/dataService'),
        router = require('durandal/plugins/router');

    var selectablePlayer = function(player) {
        var self = this;
        self.player = player;
        self.selected = ko.observable(false);
    };

    var playersToSelect = ko.observableArray([]);

    var setPlayers = function () {
        var deferred = new $.Deferred();
        
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

    var selectedPlayers = ko.computed(function() {
        return playersToSelect().filter(function(item) {
            return item.selected() === true;
        });
    });

    var goToSelectCharacters = function() {
        if (selectedPlayers().length !== 2) {
            throw new Error('You must have only two players');
        }

        sharedSelectedPlayers.player1(selectedPlayers()[0]);
        sharedSelectedPlayers.player2(selectedPlayers()[1]);
        
        router.navigateTo('#/selectcharacters');
    };

    return {
        playersToSelect: playersToSelect,
        selectedPlayers: selectedPlayers,
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