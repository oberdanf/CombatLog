define(function (require) {
    var currentPlayers = ko.observableArray([]);
    
    var markPlayer = function (playerToMark) {
        playerToMark.marked(true);
    };

    return {
        getCurrentPlayers: function() {
            return currentPlayers;
        },
        setPlayers: function (playersToSet) {
            currentPlayers(playersToSet);
        },
        markPlayer: markPlayer
    };
});