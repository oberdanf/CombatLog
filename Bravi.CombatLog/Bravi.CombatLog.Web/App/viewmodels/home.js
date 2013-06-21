define(function (require) {
    var servicoPlayers = require('services/servicoPlayer');
    
    var startCombat = function() {
        
    };
    
    var players = ko.observable();
    
    return {
        startCombat: startCombat,
        activate: function () {
            var deferred = new $.Deferred();

            servicoPlayers.getPlayers().done(function(players) {

            });

            return deferred.promise();
        },
        players: players
    };
});