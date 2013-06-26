define(function() {
    var saveCombat = function(player, round, flawlessVictory) {
        var deferred = new $.Deferred();
        
        return deferred.resolve(player.name).promise();
    };

    return {
        saveCombat: saveCombat
    };
});