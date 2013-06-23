define(function (require) {
    var currentPlayers = ko.observableArray([]);

    var getSelectedPlayers = ko.computed(function (){
        return currentPlayers().filter(
            function (playerToFilter) {
                return playerToFilter.marked() === true;
            }
        );
    });
    var markPlayer = function (playerToMark) {
        if (getSelectedPlayers().length > 2) {
            throw new Error('Maximum players allowed is 2!');
        }
        
        playerToMark.marked(true);
    };
    

    return {
        getCurrentPlayers: function() {
            return currentPlayers;
        },
        getSelectedPlayers : getSelectedPlayers,
        setPlayers: function (playersToSet) {
            currentPlayers(playersToSet);
        },
        markPlayer: markPlayer
    };
});